import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRecordOverviewComponent } from './org-record-overview.component';

describe('OrgRecordOverviewComponent', () => {
  let component: OrgRecordOverviewComponent;
  let fixture: ComponentFixture<OrgRecordOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgRecordOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRecordOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
