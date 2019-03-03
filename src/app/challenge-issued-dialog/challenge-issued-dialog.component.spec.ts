import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeIssuedDialogComponent } from './challenge-issued-dialog.component';

describe('ChallengeIssuedDialogComponent', () => {
  let component: ChallengeIssuedDialogComponent;
  let fixture: ComponentFixture<ChallengeIssuedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeIssuedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeIssuedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
