import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GlobalsService} from '../globals.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private db: AngularFirestore, private globals: GlobalsService) { }

  ngOnInit() {
  }

  setRoom(room: string) {
    this.globals.slayer.update({room: room, isActive: true});
  }
}
