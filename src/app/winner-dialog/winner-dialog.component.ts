import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WinnerDialogData} from '../winner-dialog-data';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent {

  constructor(public dialogRef: MatDialogRef<WinnerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: WinnerDialogData) { }

  onGoBackClicked() {
    this.dialogRef.close();
  }
}
