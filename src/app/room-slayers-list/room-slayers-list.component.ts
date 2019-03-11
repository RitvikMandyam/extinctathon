import {Component, OnInit} from '@angular/core';
import {Slayer} from '../slayer';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {GlobalsService} from '../globals.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material';
import {ChallengeIssuedDialogComponent} from '../challenge-issued-dialog/challenge-issued-dialog.component';
import {WaitingForSlayersComponent} from '../waiting-for-slayers/waiting-for-slayers.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-room-slayers-list',
  templateUrl: './room-slayers-list.component.html',
  styleUrls: ['./room-slayers-list.component.scss'],
  animations: [
    trigger('slideInFromRight', [
      state('true', style({
        right: '0',
        display: 'flex'
      })),
      state('false', style({
        right: '-100%',
        display: 'none'
      })),
      transition('true <=> false', [animate('255ms ease')])
    ])
  ]
})

export class RoomSlayersListComponent implements OnInit {
  slayers: Slayer[] = [];
  currentSlayer: Slayer;
  roomName: string;
  selectedSlayers: Slayer[] = [];
  selectedAnimal = '';
  allExtinctAnimals = environment.animals;
  filteredExtinctAnimals: string[];
  gameStarted = false;

  constructor(private route: ActivatedRoute, private globals: GlobalsService, private db: AngularFirestore,
              public dialog: MatDialog) {
  }

  async ngOnInit() {
    await this.route.paramMap
      .subscribe(async (paramMap: ParamMap) => {
        this.roomName = paramMap.get('name');
        if (!this.globals.slayer) {
          await this.globals.checkForStoredSlayer();
        }
        this.globals.slayer.valueChanges()
          .subscribe((slayer) => {
            this.currentSlayer = slayer;
            this.db.collection('slayers', ref => ref.where('isActive', '==', true).where('room', '==', this.roomName))
              .valueChanges().subscribe((newValue: Slayer[]) => {
              this.slayers = newValue.filter(e => e.name !== this.currentSlayer.name && (!e.isInGame || !e.isInGame.accepted));
            });
            if (slayer.isInGame.invitedBy && !slayer.isInGame.accepted) {
              this.dialog.open(ChallengeIssuedDialogComponent, {
                width: '250px',
                data: {challenger: slayer.isInGame.invitedBy}
              });
            }
          });
      });
  }

  selectSlayer(slayer: Slayer) {
    slayer.selected = !slayer.selected;
    const slayerIndex = this.selectedSlayers.findIndex((value) => value === slayer);
    if (slayerIndex >= 0) {
      this.selectedSlayers.splice(slayerIndex, 1);
    } else {
      this.selectedSlayers.push(slayer);
    }
  }

  getSelectedSlayerNames() {
    return this.selectedSlayers.map(e => '@' + e.name).join(', ');
  }

  filterExtinctAnimals() {
    const filterValue = this.selectedAnimal.toLowerCase();
    this.filteredExtinctAnimals = this.allExtinctAnimals.filter(e => e.toLowerCase().includes(filterValue)).slice(0, 5);
  }

  async startGame() {
    this.gameStarted = true;
    this.globals.slayer.get()
      .subscribe(async (snap: DocumentSnapshot<Slayer>) => {
        if (snap.exists) {
          const responder = snap.data();
          await this.globals.setGame(responder.name, true);
          await this.globals.slayer.update({isResponder: true});
          await this.globals.gameState.update({
            gameID: responder.name, responder: responder, slayers: GlobalsService.convertCustomObjectToPlain(this.selectedSlayers),
            animal: this.selectedAnimal, isFinished: false, questions: []
          });
          const promises = [];
          for (const slayer of this.selectedSlayers) {
            promises.push(this.db.collection('slayers').doc(slayer.name)
              .update({isInGame: {invitedBy: responder, accepted: null}}));
          }
          Promise.all(promises)
            .then(() => this.dialog.open(WaitingForSlayersComponent, {
              width: '250px',
              data: {slayers: this.selectedSlayers, currentSlayer: this.currentSlayer}
            }));
        }
      });
  }
}
