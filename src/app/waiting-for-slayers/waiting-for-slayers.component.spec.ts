import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForSlayersComponent } from './waiting-for-slayers.component';

describe('WaitingForSlayersComponent', () => {
  let component: WaitingForSlayersComponent;
  let fixture: ComponentFixture<WaitingForSlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForSlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingForSlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
