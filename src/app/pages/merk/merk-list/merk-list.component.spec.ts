import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkListComponent } from './merk-list.component';

describe('MerkListComponent', () => {
  let component: MerkListComponent;
  let fixture: ComponentFixture<MerkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
