import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkCreateComponent } from './merk-create.component';

describe('MerkCreateComponent', () => {
  let component: MerkCreateComponent;
  let fixture: ComponentFixture<MerkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
