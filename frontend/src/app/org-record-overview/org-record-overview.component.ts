import { Component, OnInit } from '@angular/core';
import { Record } from '../data/record';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-org-record-overview',
  templateUrl: './org-record-overview.component.html',
  styleUrls: ['./org-record-overview.component.css']
})
export class OrgRecordOverviewComponent implements OnInit {

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.getAllRecords().subscribe((data: any) => {
      this.allRecords = data;
    });
  }

  allRecords!: Record[];

}
