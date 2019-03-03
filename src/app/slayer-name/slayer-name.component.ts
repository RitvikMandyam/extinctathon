import {Component, OnInit} from '@angular/core';
import {GlobalsService} from '../globals.service';
import {Slayer} from '../slayer';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-slayer-name',
  templateUrl: './slayer-name.component.html',
  styleUrls: ['./slayer-name.component.scss']
})
export class SlayerNameComponent {
  username: string;

  constructor(private globals: GlobalsService, private db: AngularFirestore) {
  }

  getUserDetails() {
    this.globals.setSlayer(this.username);
  }
}
