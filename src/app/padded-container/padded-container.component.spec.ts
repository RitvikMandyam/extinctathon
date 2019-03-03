import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddedContainerComponent } from './padded-container.component';

describe('PaddedContainerComponent', () => {
  let component: PaddedContainerComponent;
  let fixture: ComponentFixture<PaddedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
