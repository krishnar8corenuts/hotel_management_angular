import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login } from "../model/login";
import { Rent } from "../model/Rent";
import { RoomType } from "../model/RoomType";
import { RoomDetails } from "../model/RoomDetails";
import { Booking } from "../model/Booking";
import { error } from "console";
import { Branch } from "../model/Branch";
import { DynamicPrice } from "../model/DynamicPrice";
import { Admin } from "../model/Admin";
@Injectable()
export class RestDataSource {
 dayReport:any

  constructor(private http: HttpClient) {

  }
  getUrl()
  {

    return this.envUrl;
  }
  devUrl:String="http://localhost:"
  prodUrl:String="http://34.122.139.85:"
 envUrl:String=this.devUrl

 getDetails(): Observable<Login[]> {
  return this.http.get<Login[]>(this.envUrl+"9012/hotel/branchlogin/getall");
}

verify(username:any, password:any): Observable<Branch>{
  console.log("hi")
  return this.http.get<Branch>(this.envUrl+`9012/hotel/branchlogin/verify/${username}/${password}`);
}
verifyAdmin(username:any, password:any): Observable<Branch>{

  return this.http.get<Branch>(this.envUrl+`9012/hotel/adminlogin/verify/${username}/${password}`);
}

getRoomType():Observable<RoomType[]>
{
  return this.http.get<RoomType[]>(this.envUrl+`9014/hotel/roomtype/getall`);
}

getRent():Observable<Rent[]>
{
  return this.http.get<Rent[]>(this.envUrl+`9014/hotel/rent/getall`);
}

getRoomsStatus(branchId:number,checkIn:string,checkOut:string):Observable<Map<string,Map<string,number>>>{
  return this.http.get<Map<string,Map<string,number>>>(this.envUrl+`9014/hotel/roomdetails/${branchId}/${checkIn}/${checkOut}`)
}

getAvailableRooms(branchId:number,checkIn:string,checkOut:string):Observable<Map<String, RoomDetails[]>>{
  console.log()
  return this.http.get<Map<String, RoomDetails[]>>(this.envUrl+`9014/hotel/roomdetails/findavailablerooms/${branchId}/${checkIn}/${checkOut}`)
}

sendDetails(booking:Booking):Observable<Booking>
{
  return this.http.post<Booking>(this.envUrl+`9011/hotel/booking/save`,booking)
  }


getBookingDetails():Observable<Booking[]>
{
  return this.http.get<Booking[]>(this.envUrl+`9011/hotel/booking/getall`)
}
pdfView(bookingId:number |undefined):Observable<any>
{
  console.warn(bookingId,"method calling")
 return this.http.get<any[]>(this.envUrl+`9011/hotel/booking/pdf/customer/${bookingId}`)
}

//Reporting Api's

getReportsDaily(branchId:number):Observable<Map<Date,number>>
{
  console.log(branchId)
return this.http.get<Map<Date,number>>(this.envUrl+`9013/hotel/reporting/daily`)
}
getReportsMonthly(branchId:number):Observable<any>
{
return this.http.get<any>(this.envUrl+`9013/hotel/reporting/monthly`)
}
getReportsYearly(branchId:number):Observable<any>
{
return this.http.get<any>(this.envUrl+`9013/hotel/reporting/yearly`)
}



getBookingByDate(branchId:number,checkIn:string,checkOut:string):Observable<Booking[]>
{
  return this.http.get<Booking[]>(this.envUrl+`9011/hotel/booking/${branchId}/${checkIn}/${checkOut}`)
}
getDynamicPrice():Observable<DynamicPrice[]>
{
  return this.http.get<DynamicPrice[]>(this.envUrl+`9014/hotel/dynamicprice/getall`)
}
addAdmin(admin:Admin):Observable<Admin>{
  return this.http.post(this.envUrl+`9012/hotel/adminlogin/save`,admin)
}
addBranch(branch:Branch,hotelId:number):Observable<string>{
  return this.http.post<string>(this.envUrl+`9012/hotel/branch/save/${hotelId}`,branch)
}
getAllBranches():Observable<Branch[]>{
  return this.http.get<Branch[]>(this.envUrl+`9012/hotel/branch/getall`)
}
}


