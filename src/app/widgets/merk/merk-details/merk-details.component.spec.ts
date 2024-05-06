import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkDetailsComponent } from './merk-details.component';

describe('MerkDetailsComponent', () => {
  let component: MerkDetailsComponent;
  let fixture: ComponentFixture<MerkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
