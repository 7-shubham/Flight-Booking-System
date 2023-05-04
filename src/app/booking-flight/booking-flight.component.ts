import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking-flight',
  templateUrl: './booking-flight.component.html',
  styleUrls: ['./booking-flight.component.css']
})
export class BookingFlightComponent implements OnInit {

  bookingTicket!: FormGroup
  submitted: string = "false";
  confirmMessage:string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router ) { }

  ngOnInit(): void {
    this.bookingTicket = this.fb.group({
      name: ['', Validators.required],
      tickets: ['', [Validators.required, Validators.minLength(1)]],
      flightId: ['', [Validators.required, Validators.minLength(7)]],
      amount: ['', Validators.required]
    })
  }

  onSubmit(){
    this.http.post<any>('http://localhost:3000/bookedTickets', this.bookingTicket.value).subscribe((res)=>{
        if(this.submitted = 'true'){
          this.confirmMessage = "Redirecting to the Details Page...",
          setTimeout(() => {
            this.router.navigate(['/view-booked']);
          }, 2000);
        }
        this.bookingTicket.reset();
    }, (err)=>{
        alert("Something went wrong")
    })
  }


}
