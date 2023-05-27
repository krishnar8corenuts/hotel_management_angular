// import { ChartObject } from './../../model/chartObject';
import { Component, OnChanges, OnInit, SimpleChanges ,Input, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from '../../model/RoomType';
import { LoginRepository } from '../../Services/DataRepository';
import { Rent } from '../../model/Rent';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RoomDetails } from '../../model/RoomDetails';
import { Console } from 'console';
import {Chart} from 'chart.js/auto';

import { RestDataSource } from 'src/app/Services/RestDataLogin';
import Swal from 'sweetalert2';
import { Branch } from 'src/app/model/Branch';

@Component({
    selector: 'signIn',
    templateUrl: 'Frontpage.component.html',
    styleUrls: ['Front.component.css']
})

export class FrontpageComponent  implements OnChanges,OnInit{
  currentDate = new Date();
  nextDate=new Date()
  fromDate?: string | null;
  branch:Branch=new Branch()
  toDate?:string|null;
  public roomStatus:any
  availableRooms!:Map<String, RoomDetails[]>
    hideRoomType:boolean = true;
    hideMainpage:boolean=false;
    rent:Rent=new Rent();
    AvailableCount!:number
    BookedCount!:number
    Available:number=0
    Booked:number=0
    avail=''
    value:number=0
    notAvailable:boolean=false
    // chartObjects:ChartObject[]=[]

    constructor(private router:Router,private repo:LoginRepository,private elementRef: ElementRef,
      private activateRoute:ActivatedRoute,private date:DatePipe,private restData:RestDataSource) {

      this.fromDate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
      this.nextDate.setDate(this.currentDate.getDate()+1)
      this.toDate=this.date.transform(this.nextDate,'yyyy-MM-dd')
      this.nextDate.setDate(this.currentDate.getDate()+1)
      const branchh=this.repo.getBranch
      this.branch=JSON.parse(branchh!)
      console.log(this.branch)
      this.repo.getRoomsStatus(this.branch.branchid!,JSON.stringify(this.fromDate),JSON.stringify(this.toDate));
      // this.getAvailableRooms()
      // console.log(this.availableRooms)
      console.log("front page loaded")
     }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['value'])
    {
      console.log("changed")
    }
  }



     getAvailableRooms()
   {
   this.availableRooms= this.repo.getAvailableRooms(this.branch.branchid! ,JSON.stringify(this.fromDate),JSON.stringify(this.toDate));
    console.log(this.availableRooms)
    }
    get Rooms():Map<String, RoomDetails[]>
    {
      return this.repo.getRooms();
    }

     getRoomsStatusOnDateChange()
     {
      console.log("front page date changed ")
       this.repo.getRoomsStatus(this.branch.branchid!,JSON.stringify(this.fromDate),JSON.stringify(this.toDate));
       this.ngAfterViewInit()
     }
     get statusCount():Map<string,Map<string,number>>{
        return this.repo.getRoomStatusCount()
       }
   get RoomType():RoomType[]
   {
    return this.repo.getRoomType()
   }

   get Rent():Rent[]|undefined
   {
    return this.repo.getRents()
   }

   getValue(key:string):RoomDetails[]
   {
      return this.availableRooms.get(key)!
   }
   getAvailabValue(key1:string,key2:string){
    const myMap = new Map(Object.entries(this.roomStatus));
    console.log(typeof myMap)
    console.log(key1 ,key2)
    console.log(myMap.has('Double AC'))
      console.log( this.roomStatus)
      return  this.roomStatus.get(key1)?.get(key2)
   }

   bookRoom(roomType:any,roomTypeData:any) {
    if(roomTypeData.Available!=0)
    {
      console.log( roomTypeData)
      const data={room:roomType,roomdata:roomTypeData,fromDate : this.fromDate,toDate : this.toDate}
      console.log(data)
      this.repo.bookRoom(data)
      this.router.navigateByUrl("/main/branch/bookingform")
    }
    else{
      Swal.fire({
        title: 'Sorry',
        text: ` ${roomType} rooms are not available`,
        icon: 'error',
        confirmButtonText: 'Back'
      })
    }

 }
   showRoomType(){
    this.hideRoomType = true;
   }


   booking()
   {
    console.log("showing")
    this.hideRoomType = true;
   }


  showBooking()
  {

    this.router.navigateByUrl('/booking')

  }
  showCustomer()
  {

    this.router.navigateByUrl('/customer')

  }

    login()
    {
        this.router.navigateByUrl("/signin")
    }

    newChartObject(ctx: CanvasRenderingContext2D, chartData: any): Chart {
      return new Chart(ctx, chartData);
    }
    getMinDate() {

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1; // January is 0
      const year = today.getFullYear();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
    ngAfterViewInit() {

      this.restData.getRoomsStatus(this.branch.branchid! ,JSON.stringify(this.fromDate),JSON.stringify(this.toDate))
      .subscribe(data=>{
        this.roomStatus=data
        setTimeout(()=>{
          for(const key in this.roomStatus)
        {
         
          for(const keyy in this.roomStatus[key])
          {
              if(keyy=='Available')
              {
                this.AvailableCount=this.roomStatus[key][keyy]

              }
              if(keyy=='Booked')
              {
                this.BookedCount=this.roomStatus[key][keyy]
              }

          }
          const canvas = document.getElementById(`${key}`) as HTMLCanvasElement;
          console.log(this.AvailableCount,this.BookedCount)
                console.log(canvas)


                const ctx = canvas.getContext('2d');
          const existingChart = Chart.getChart(ctx!);
          if (existingChart) {
            existingChart.destroy();
          }
                new Chart(ctx!, {
                  type: 'pie',
                  data: {
                    labels: ['Booked','Available'],
                    datasets: [{
                      label: `${key} Rooms Count`,
                      data: [this.BookedCount,this.AvailableCount],
                      backgroundColor: [
                        'red',
                        'yellowgreen'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                      ],
                      borderWidth: 1
                    }]
                  },
                  options: {
                      responsive: false,
                        maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        // max:176
                        display:false
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          font: {
                            size:16,
                             weight: 'bold'
                          }
                        }
                      }
                    }
                  }
                });


        }
        })
      })



    }


}
