import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rec-table',
  templateUrl: './rec-table.component.html',
  styleUrls: ['./rec-table.component.css']
})
export class RecTableComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
      private webService: WebServiceService
    ) { }

    data: MatTableDataSource<any> | undefined;
    dataSubscription!: Subscription;
    url = 'https://data.uspreventiveservicestaskforce.org/api/json?key=38TX6xUfkn6wfm6b7X9nAu';

    columnsToDisplay = ['title', 'grade'];

    ngOnInit() {
      this.webService.getJsonData(this.url).subscribe();
      this.dataSubscription = this.webService.data$.subscribe(
        data => this.data = new MatTableDataSource(data.specificRecommendations)
      );
      console.log(this.data);
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
      if (this.data) {
      //this.data.paginator = this.paginator;
      //this.data.sort = this.sort;
      }
    }

}
