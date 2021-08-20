import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEditSportsComponent } from './org-edit-sports.component';

describe('OrgEditSportsComponent', () => {
  let component: OrgEditSportsComponent;
  let fixture: ComponentFixture<OrgEditSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgEditSportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgEditSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
