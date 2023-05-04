import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookFlightService } from '../services/book-flight.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  bookingDetails!:FormGroup

  constructor(private fb:FormBuilder, private api:BookFlightService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.bookingDetails = this.fb.group({
      name:['', Validators.required],
      flightId: ['', Validators.required],
      tickets:['', Validators.required],
      amount: ['', Validators.required]
    })

    if(this.editData){
      this.bookingDetails.controls['name'].setValue(this.editData.name)
      this.bookingDetails.controls['flightId'].setValue(this.editData.flightId)
      this.bookingDetails.controls['tickets'].setValue(this.editData.tickets)
      this.bookingDetails.controls['amount'].setValue(this.editData.amount)
    }
  }
  
  onUpdate(){
    this.api.updateBooking(this.bookingDetails.value, this.editData.id).subscribe((res)=>{
      alert('User data updated successfully');
      this.bookingDetails.reset();
      this.dialogRef.close();
    }, (err)=>{
      alert('Something went wrong');
    })
  }


}
