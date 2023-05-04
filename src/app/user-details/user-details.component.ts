import { Component, OnInit } from '@angular/core';
import { BookFlightService } from '../services/book-flight.service';
import {DetailsModel} from '../view-details/view-details.models'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
   
  private userId!: number;
  userDetails!:DetailsModel
  constructor(private api:BookFlightService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val =>{
      this.userId = val['id'];
      this.getUserDetails(this.userId);
    })
  }

  getUserDetails(userId:number){
      this.api.getUserDetailsById(userId).subscribe((res)=>{
        this.userDetails = res;
      },(err)=>{
        alert("Something went wrong");
      })  
  }

}
