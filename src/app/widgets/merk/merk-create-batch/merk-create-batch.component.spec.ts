import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkCreateBatchComponent } from './merk-create-batch.component';

describe('MerkCreateBatchComponent', () => {
  let component: MerkCreateBatchComponent;
  let fixture: ComponentFixture<MerkCreateBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkCreateBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkCreateBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
