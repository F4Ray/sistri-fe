import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardWaitingListComponent } from './dasboard-waiting-list.component';

describe('DasboardWaitingListComponent', () => {
  let component: DasboardWaitingListComponent;
  let fixture: ComponentFixture<DasboardWaitingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardWaitingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardWaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
