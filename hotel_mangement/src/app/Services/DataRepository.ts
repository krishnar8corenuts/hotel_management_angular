import { Injectable } from "@angular/core";
import { RestDataSource } from "./RestDataLogin";
import { Login } from "../model/login";
import { Router } from "@angular/router";
import { Branch } from "../model/Branch";
import { Rent } from "../model/Rent";
import { RoomType } from "../model/RoomType";
import { RoomDetails } from "../model/RoomDetails";
import { Customer } from "../model/Customer";
import { Booking } from "../model/Booking";
import { BehaviorSubject } from "rxjs";
import { DynamicPrice } from "../model/DynamicPrice";
import { Admin } from "../model/Admin";
import Swal from 'sweetalert2'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class LoginRepository{
  branches:Branch[]=[]
branch:Branch=new Branch()
login:Login[]=[]
roomType:RoomType[]=[]
rents:Rent[]=[]
rentId:any=0
RoomTypeId:any=0
rentByRoomType:Rent[]=[]
booking:Booking[]=[]
availableRooms!:Map<String, RoomDetails[]>
roomTypeData:any
bookingDetails:Booking[]=[]
bookingByDate:Booking[]=[]
dynamicPrice:DynamicPrice[]=[]
adminLogin:Branch=new Branch()
private myObservableVariable = new BehaviorSubject<Map<string,Map<string,number>>>(new Map());
public roomStatus!:Map<string,Map<string,number>>
    constructor(private dataSource: RestDataSource, private router:Router,private http:HttpClient){
      this.dataSource.getRoomType().subscribe(p => this.roomType = p)
      this.dataSource.getDetails().subscribe(e=> this.login=e)
      this.dataSource.getRent().subscribe(rent=>this.rents=rent)
      this.dataSource.getBookingDetails().subscribe(details=>this.bookingDetails=details)
      this.dataSource.getDynamicPrice().subscribe(price=>this.dynamicPrice=price)

    }
    getRoomsStatus(branchId:number,checkIn:string,checkOut:string){
      this.dataSource.getRoomsStatus(branchId,checkIn,checkOut).subscribe(data=>{
        this.roomStatus=data
        // this.myObservableVariable.next(data)
        console.log("subscribing")
        console.log(this.roomStatus)
      })
  }

  //Get bookings by Date
getBookingsByDate(branchId:number,checkIn:string,checkOut:string):Booking[]
{
  this.dataSource.getBookingByDate(branchId,checkIn,checkOut).subscribe(

    value=>{this.bookingByDate=value})
  return this.bookingByDate;
}

getDynamicPrice()
{
  return this.dynamicPrice
}

getBookingsList():Booking[]
{
  return this.bookingByDate;
}
//Get bookings by Date ended
  getBookingDetails():Booking[]
      {

        return this.bookingDetails
      }
      getBookingDetailsOne(bookingId:any):Booking|undefined
      {

        return this.bookingDetails.find(p => p.bookingId == bookingId);
      }
  getRoomStatusCount():Map<string,Map<string,number>>{
    console.log("sending to front page")
    return this.roomStatus
  }
  getRoomStatusCounts(){
    console.log(this.myObservableVariable)
    return this.myObservableVariable.asObservable()
  }

  getAvailableRooms(branchId:number,checkIn:string,checkOut:string):Map<String, RoomDetails[]>
{
  this.dataSource.getAvailableRooms(branchId,checkIn,checkOut).subscribe(

    value=>{this.availableRooms=value})
  return this.availableRooms;
}

getRooms():Map<String, RoomDetails[]>
{
  return this.availableRooms
}
    sendDetails(rentId:number |undefined,roomtypeId:number | undefined){
      console.log("send")
      this.RoomTypeId=roomtypeId;
      this.rentId=rentId

}
bookRoom(data:any)
    {
      this.roomTypeData=data
    }
    getRoomTypeData()
    {
      return this.roomTypeData
    }


sendDetailsForm(booking:Booking)
{
  this.dataSource.sendDetails(booking).subscribe(
    e=>{
      this.booking.push(e)
      const book=e
      this.print(book.bookingId)
      this.router.navigateByUrl("/main/branch/home")

    }
    );
   console.log(booking);

}
print(bookingId: number | undefined) {
  console.warn(bookingId);
  const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
  const options = { headers: headers, responseType: 'blob' as 'json' };

  this.http.get(this.dataSource.getUrl()+`9011/hotel/booking/pdf/customer/${bookingId}`, options).subscribe(
    (data: any) => { // Use 'any' type for data
      const blob = new Blob([data], { type: 'application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `booking_${bookingId}.pdf`;
      downloadLink.click();
    },
    (error) => {
      console.error(error);
    }
  );
}
updateDetailsForm(booking:Booking)
{
  this.dataSource.sendDetails(booking).subscribe(
    e=>{
      this.router.navigateByUrl("/main/branch/home")
    }
    );
   console.log(booking);
}
    getRoomTypeOne(roomTypeId:number)
    {
      console.log(roomTypeId)
        return this.roomType.find(e=>e.roomTypeId==roomTypeId)

    }
    getRoomRentOne(rentId:number)
    {
      console.log(rentId)
        return this.rents.find(e=>e.rentId==rentId)

    }

   getRoomType():RoomType[]
   {
      return this.roomType
   }

   getRents():Rent[]
   {
      return this.rents
   }

   get getBranch()
   {
    return localStorage.getItem("branch")
   }
   verifyAdmin(username: any, password: any) {
    console.warn(username,password)
    if (username && password) {
      console.warn(username,password)
      this.dataSource.verifyAdmin(username, password).subscribe(response => {
        console.warn("response=", response);
        if (response != null) {
          console.warn(username,password)
          localStorage.setItem("adminLogin", JSON.stringify(response))
          this.adminLogin= response;
          Swal.fire({
            title: "Success",
            text: "Admin verified!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            console.warn("admin")
            this.router.navigateByUrl("/admins");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid email or password",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }, error => {
        this.showError("API Error: " + error);
      });
    } else {
      this.showError("Email or password is undefined");
    }
  }






verify(username: any, password: any) {
      // Make sure email and password are not undefined
      if (username && password) {
        this.dataSource.verify(username, password).subscribe(response => {
          // Handle the response as string
          if (response!=null) {
            localStorage.setItem("branch",JSON.stringify(response))
            this.branch=response
            console.log(this.branch)
            this.router.navigateByUrl("/main");
          } else {
            // Handle the error case
            this.showError("Invalid email or password");
          }
        }, error => {
          // Handle any error that occurs during the API call
          this.showError("API Error: " + error);
        });
      } else {
        // Handle the case where email or password is undefined
        this.showError("Email or password is undefined");
      }
    }

    showError(errorMsg: string) {
      // Display the error message on the page (you can customize this part based on your application's UI)
      alert(errorMsg);
    }
    addAdmin(admin:Admin){
      this.dataSource.addAdmin(admin).subscribe((admin11)=>{
        console.log(admin11)
        Swal.fire({
          title: 'Thank You🙏',
          text: 'Admin Added Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          backdrop: 'static',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("/admins/adminhome/hotel")
          }
        })
      }
      )
    }
    addBranch(branch:Branch,hotelId:number){
      this.dataSource.addBranch(branch,hotelId).subscribe((admin11)=>{
        console.log(admin11)
        if(admin11!=null){
          Swal.fire({
          title: 'Thank You🙏',
          text: 'Branch Added Successfully',
          icon: 'success',
          confirmButtonText: 'Go To Homepage',
          backdrop: 'static',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("/admins/adminhome/hotel")
          }
        })
        }
        else{
          Swal.fire({
            title: 'Thank You🙏',
            text: 'Branch Already Exists',
            icon: 'success',
            confirmButtonText: 'Go To Homepage',
            backdrop: 'static',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl("/admins/adminhome/hotel")
            }
          })
        }

      }
      )
    }
    getAllBranches(){
      this.dataSource.getAllBranches().subscribe((data)=>{
        console.log(data)
        this.branches=data
      })
    }

    returnAllBranches():Branch[]{
      return this.branches
    }

          }




