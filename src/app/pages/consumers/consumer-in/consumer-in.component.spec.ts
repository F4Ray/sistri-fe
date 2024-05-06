import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerInComponent } from './consumer-in.component';

describe('ConsumerInComponent', () => {
  let component: ConsumerInComponent;
  let fixture: ComponentFixture<ConsumerInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
