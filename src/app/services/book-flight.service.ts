import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailsModel } from '../view-details/view-details.models';


@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  constructor(private http: HttpClient) { }

  getBookings(){
    return this.http.get<any>('http://localhost:3000/bookedTickets');
  }

  getUserDetailsById(id: number){
    return this.http.get<any>('http://localhost:3000/bookedTickets/'+id)
  }

  updateBooking(data:any, id: number){
    return this.http.put<any>('http://localhost:3000/bookedTickets/' +id, data)
  }

  deleteBooking(id:any){
    return this.http.delete<any>('http://localhost:3000/bookedTickets/'+ id);
  }
}
