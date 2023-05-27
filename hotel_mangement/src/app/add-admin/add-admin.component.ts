import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Admin } from 'src/app/model/Admin';
import { Hotel } from 'src/app/model/Hotel';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  public admin:Admin=new Admin()
  public hotel:Hotel=new Hotel()
 phoneNoError:boolean=false
  constructor(private repo:LoginRepository) { }

  ngOnInit(): void {
  }
  validatePhoneNo() {
    const phoneNumber = this.admin.phoneNumber;
    const phoneNumberString = phoneNumber?.toString(); // convert number to string
    const numericRegex = /^\d+$/; // regex to match only numeric values
    const firstDigitRegex = /^[^012345]/; // regex to match numbers not starting with 0 or 1
    console.log("==========")
    if (!phoneNumberString || 
      (phoneNumber && (phoneNumber.toString().length !== 10 || !numericRegex.test(phoneNumberString) || !firstDigitRegex.test(phoneNumberString))))  {
      this.phoneNoError = true;
    } else {
      this.phoneNoError = false;
    }
    console.log("==========")
  }
  submitDetails(form:Form){
  const value=  localStorage.getItem("adminLogin")
  const c=JSON.parse(value!)
    console.log(c[0].hotel)
    this.admin.hotel=c[0].hotel
    console.log(this.admin)
    this.repo.addAdmin(this.admin)
  }

}