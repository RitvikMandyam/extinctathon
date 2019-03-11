import {Component} from '@angular/core';
import {GlobalsService} from '../globals.service';

@Component({
  selector: 'app-slayer-name',
  templateUrl: './slayer-name.component.html',
  styleUrls: ['./slayer-name.component.scss']
})
export class SlayerNameComponent {
  username: string;

  constructor(private globals: GlobalsService) {
  }

  getUserDetails() {
    this.globals.setSlayer(this.username);
  }
}
