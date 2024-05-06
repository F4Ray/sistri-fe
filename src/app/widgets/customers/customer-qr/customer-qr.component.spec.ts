import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQrComponent } from './customer-qr.component';

describe('CustomerQrComponent', () => {
  let component: CustomerQrComponent;
  let fixture: ComponentFixture<CustomerQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
