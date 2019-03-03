import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChallengeIssuedDialogData} from '../challenge-issued-dialog-data';
import {GlobalsService} from '../globals.service';
import {DocumentSnapshot} from '@angular/fire/firestore';
import {Slayer} from '../slayer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-challenge-issued-dialog',
  templateUrl: './challenge-issued-dialog.component.html',
  styleUrls: ['./challenge-issued-dialog.component.scss']
})
export class ChallengeIssuedDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChallengeIssuedDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ChallengeIssuedDialogData, private globals: GlobalsService, private router: Router) { }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.globals.slayer.get()
      .subscribe(async (value: DocumentSnapshot<Slayer>) => {
        await this.globals.setGame(value.data().isInGame.invitedBy.name, false);
        await this.globals.slayer.update({isResponder: false, isInGame: {invitedBy: value.data().isInGame.invitedBy, accepted: true}});
        this.router.navigateByUrl('/play');
      });
    this.dialogRef.close();
  }
}
