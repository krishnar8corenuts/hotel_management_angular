import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Booking } from 'src/app/model/Booking';
import { DatePipe } from '@angular/common';
import { Branch } from 'src/app/model/Branch';
@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls:['payment.component.css']
})

export class PaymentComponent implements OnInit {
    pageSize = 4;
  p: number = 1;
  currentPage = 1;
    currentDate = new Date();
    nextDate=new Date()
    fromDate?: string | null;
    toDate?:string|null;
    branch:Branch=new Branch()
    constructor(private repo:LoginRepository,private router:Router,private date:DatePipe) { 
        this.fromDate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
    this.nextDate.setDate(this.currentDate.getDate() + 1)
    this.toDate = this.date.transform(this.nextDate, 'yyyy-MM-dd')
    this.nextDate.setDate(this.currentDate.getDate() + 1)
    this.getRoomDetailsByDates()
    }

    ngOnInit() { }

    back()
    {
        this.router.navigateByUrl('/main')
      
    }
    getRoomDetailsByDates()
    {
     console.log("==================")
     const branchh=this.repo.getBranch
      this.branch=JSON.parse(branchh!)
     this.repo.getBookingsByDate(this.branch.branchid!,JSON.stringify(this.fromDate),JSON.stringify(this.toDate))
    }
    get bookingByDate():Booking[]
 {
   return this.repo.getBookingsList()
 }

 onPageChange(event:any) {
    this.currentPage = event;
}
}