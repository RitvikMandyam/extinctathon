import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlayerNameComponent } from './slayer-name.component';

describe('SlayerNameComponent', () => {
  let component: SlayerNameComponent;
  let fixture: ComponentFixture<SlayerNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlayerNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlayerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
