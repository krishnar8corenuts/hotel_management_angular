import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Form } from '@angular/forms';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Admin } from 'src/app/model/Admin';
import { Branch } from 'src/app/model/Branch';

@Component({
  selector: 'app-add-branch',
  templateUrl: 'add-branch.component.html',
  styleUrls: ['add-branch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBranchComponent implements OnInit {

public branch: Branch=new Branch()
  constructor(private repo:LoginRepository) { }

  ngOnInit(): void {
  }

  submitDetails(form:Form){
    const value=  localStorage.getItem("adminLogin")
  const c=JSON.parse(value!)
    console.log(c[0].hotel)
    const id=c[0].hotel.hotelId
    this.repo.addBranch(this.branch,id)
  }

}