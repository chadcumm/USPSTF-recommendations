import { Component,OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-rec-table',
  templateUrl: './rec-table.component.html',
  styleUrls: ['./rec-table.component.css']
})
export class RecTableComponent {

    constructor(
      private webService: WebServiceService
    ) { }

    data: any;
    dataSubscription!: Subscription;
    url = 'https://data.uspreventiveservicestaskforce.org/api/json?key=38TX6xUfkn6wfm6b7X9nAu';

    columnsToDisplay = ['title', 'grade'];

    ngOnInit() {
      this.webService.getJsonData(this.url).subscribe();
      this.dataSubscription = this.webService.data$.subscribe(
        data => this.data = data
      );
      console.log(this.data);
    }
  
    ngOnDestroy() {
      if (this.dataSubscription) {
        this.dataSubscription.unsubscribe();
      }
    }

}
