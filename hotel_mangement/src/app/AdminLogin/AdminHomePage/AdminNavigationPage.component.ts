import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'AdminNavigationPage.component.html',
  styleUrls:['AdminNavigationPage.component.css']
})

export class AdminNavigationPageComponent  {
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
