import {Component, HostListener} from '@angular/core';
import {GlobalsService} from './globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private globals: GlobalsService) { }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler($event) {
    $event.returnValue = true;
    this.globals.takeSlayerOffline();
  }
}
