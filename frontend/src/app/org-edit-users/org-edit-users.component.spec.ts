import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEditUsersComponent } from './org-edit-users.component';

describe('OrgEditUsersComponent', () => {
  let component: OrgEditUsersComponent;
  let fixture: ComponentFixture<OrgEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgEditUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
