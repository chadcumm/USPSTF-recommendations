import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-rec-table',
  templateUrl: './rec-table.component.html',
  styleUrls: ['./rec-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecTableComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
      private webService: WebServiceService
    ) { }

    data: MatTableDataSource<any> | undefined;
    dataSubscription!: Subscription;

    columnsToDisplay = ['title', 'grade'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElement: any | null;

    ngOnInit() {
      this.dataSubscription = this.webService.getJsonData().subscribe(
        data => {
          this.data = new MatTableDataSource(data.specificRecommendations);
          //this.data.sort = this.sort;
        }
      );
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      if (this.data) {
        this.data.filter = filterValue.trim().toLowerCase();
        if (this.data.paginator) {
          this.data.paginator.firstPage();
        }
      }
    }

    ngAfterViewInit() {
      if (this.data && this.paginator && this.sort) {
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    }

}
