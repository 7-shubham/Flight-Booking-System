import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookFlightService } from '../services/book-flight.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  displayedColumns:string[] = [ 'bookingId',  'name', 'flightId', 'tickets', 'amount', 'action']
  dataSource!:MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router, private api: BookFlightService, public dialog: MatDialog) { }

  ngOnInit(): void {
     this.getBookingDetails();
  }

  getBookingDetails(){
    this.api.getBookings().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err)=>{
      alert("Something Went Wrong");
    })
  }

  onEdit(row:any){
     this.dialog.open(DialogComponent, {
      width:'30%',
      data: row
     }).afterClosed().subscribe(val =>{
         this.getBookingDetails();
     })
  }

  onDelete(id:any){
     this.api.deleteBooking(id).subscribe((res)=>{
       alert(`User with booking id ${id} is deleted successfully`);
       this.getBookingDetails();
     }, (err)=>{
      console.log('Something went wrong')
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
