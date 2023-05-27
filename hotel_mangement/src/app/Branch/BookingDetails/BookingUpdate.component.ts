import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Booking } from 'src/app/model/Booking';
import { Branch } from 'src/app/model/Branch';

@Component({
    selector: 'booking-update',
    templateUrl: 'BookingUpdate.component.html',
    styleUrls:['BookingUpdate.component.css']
})

export class BookingUpdateComponent implements OnInit {

  phoneNoError:boolean=false
  aadharNoError:boolean=false
    booking:Booking=new Booking();
    
    constructor(private repo:LoginRepository, activeRoute:ActivatedRoute,private route:Router) {
        Object.assign(this.booking,
            repo.getBookingDetailsOne(activeRoute.snapshot.params["bookingId"]));
         
    }
    ngOnInit() { }
    validatePhoneNo() {
      const phoneNumber = this.booking?.customer?.customerPhoneNo;
      if (!phoneNumber || (phoneNumber && phoneNumber.toString().length !== 10)) {
        this.phoneNoError = true;
      } else {

        this.phoneNoError = false;

      }
    }
    validateAadhar()
  {
    const aadharNumber = this.booking?.customer?.customerAadharNo;
    if (!aadharNumber || (aadharNumber && aadharNumber.toString().length !== 12)) {
        this.aadharNoError = true;
      } else {

        this.aadharNoError = false;

      }
  }
  goBack(){
    // this.showRoomType.emit();
    this.route.navigateByUrl("/main/branch/bookingdetails")
  }

     //for date
    getMinDate() {

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // January is 0
        const year = today.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      }
      //submission
    submitDetails(form: NgForm)
    {
      this.repo.updateDetailsForm(this.booking)
      // this.route.navigateByUrl('/main/branch/bookingdetails')
    }


}
