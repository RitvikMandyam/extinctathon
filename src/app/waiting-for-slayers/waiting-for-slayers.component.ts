import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WaitingForSlayersData} from '../waiting-for-slayers-data';
import {Slayer} from '../slayer';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting-for-slayers',
  templateUrl: './waiting-for-slayers.component.html',
  styleUrls: ['./waiting-for-slayers.component.scss']
})
export class WaitingForSlayersComponent implements OnInit {
  slayers: Slayer[] = [];
  awaitedSlayers: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<WaitingForSlayersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WaitingForSlayersData, private db: AngularFirestore, private router: Router) { }

  async ngOnInit() {
    for (const slayer of this.data.slayers) {
      this.db.doc(`slayers/${slayer.name}`).valueChanges()
        .subscribe((newSlayer: Slayer) => {
          let slayerIndex = this.slayers.findIndex(e => e.name === newSlayer.name);
          if (slayerIndex < 0) {
            slayerIndex = this.slayers.length === 0 ? 0 : this.slayers.length;
          }
          this.awaitedSlayers[slayerIndex] = newSlayer.isInGame.accepted === null;
          this.slayers[slayerIndex] = newSlayer;
          if (this.awaitedSlayers.every(e => e === false)) {
            if (this.data.currentSlayer.isResponder) {
              this.router.navigateByUrl('/play');
            }
            this.dialogRef.close();
          }
        });
    }
  }

  getAcceptanceClass(accepted: boolean) {
    if (accepted === null) {
      return 'waiting';
    } else if (accepted) {
      return 'accepted';
    } else {
      return 'refused';
    }
  }
}
