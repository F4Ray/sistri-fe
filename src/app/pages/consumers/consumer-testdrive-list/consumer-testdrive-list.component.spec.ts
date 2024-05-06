import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerTestdriveListComponent } from './consumer-testdrive-list.component';

describe('ConsumerTestdriveListComponent', () => {
  let component: ConsumerTestdriveListComponent;
  let fixture: ComponentFixture<ConsumerTestdriveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerTestdriveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerTestdriveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
