import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSlayersListComponent } from './room-slayers-list.component';

describe('RoomSlayersListComponent', () => {
  let component: RoomSlayersListComponent;
  let fixture: ComponentFixture<RoomSlayersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSlayersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
