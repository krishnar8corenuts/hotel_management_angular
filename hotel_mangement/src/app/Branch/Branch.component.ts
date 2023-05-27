import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'Branch.component.html',
  styleUrls:['Branch.component.css']
})

export class BranchComponent  {
  isSideNavOpened : boolean =false;
  constructor(private route:Router) { }
  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }
  logout(){
    localStorage.removeItem("branch")
    this.route.navigateByUrl("/homepage")
  }
}
