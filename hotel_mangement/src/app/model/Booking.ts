import { Customer } from "./Customer"
import { Rent } from "./Rent"
import { RoomDetails } from "./RoomDetails"

export class Booking
{
        bookingId?:number
        checkInTime?:Date
        checkOutTime?:Date
        totalAmount?:number
        advanceAmount?:number
        dueAmount?:number
        durationOfStay?:number
        customer?:Customer
        roomDetails?:RoomDetails
}
