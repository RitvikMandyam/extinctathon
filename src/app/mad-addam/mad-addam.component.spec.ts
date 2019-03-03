import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadAddamComponent } from './mad-addam.component';

describe('MadAddamComponent', () => {
  let component: MadAddamComponent;
  let fixture: ComponentFixture<MadAddamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadAddamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadAddamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
