import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-padded-container',
  templateUrl: './padded-container.component.html',
  styleUrls: ['./padded-container.component.scss']
})
export class PaddedContainerComponent implements OnInit {
  @Input() flexDirection: string;

  constructor() { }

  ngOnInit() {
  }

}
