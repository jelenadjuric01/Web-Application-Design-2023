import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgencyComponent } from './admin-agency.component';

describe('AdminAgencyComponent', () => {
  let component: AdminAgencyComponent;
  let fixture: ComponentFixture<AdminAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
