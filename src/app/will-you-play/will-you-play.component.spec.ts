import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillYouPlayComponent } from './will-you-play.component';

describe('WillYouPlayComponent', () => {
  let component: WillYouPlayComponent;
  let fixture: ComponentFixture<WillYouPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillYouPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillYouPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
