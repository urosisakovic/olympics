import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEditCompetitionsComponent } from './org-edit-competitions.component';

describe('OrgEditCompetitionsComponent', () => {
  let component: OrgEditCompetitionsComponent;
  let fixture: ComponentFixture<OrgEditCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgEditCompetitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgEditCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
