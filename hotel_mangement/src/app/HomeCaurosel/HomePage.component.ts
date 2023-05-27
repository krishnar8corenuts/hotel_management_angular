import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
    selector: 'homepage',
    templateUrl: 'HomePage.component.html',
    styleUrls:['HomePage.component.css']
})
export class HomePageComponent implements OnInit {
    navbarOpen: boolean = false;
    constructor(private route:Router) { }
  
    ngOnInit() { }
  
   
   
    
    login(){
    // In your existing Swal.fire method, add a custom footer with the "Back" button
    Swal.fire({
      title: 'Choose Login',
      text: '',
      icon: 'info',
      iconHtml: '<i class="fas fa-sign-in-alt"></i>',
      confirmButtonText: 'Admin',
      cancelButtonText: 'User',
      showCancelButton: true,
      backdrop: 'static',
      allowOutsideClick: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#126d6b',
     
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle admin button click event here
        this.route.navigateByUrl("/admin");
      } else  {
        
        console.log('Navigating to user signin');
  this.route.navigateByUrl("/signin");
      }
      Swal.close();
     
    });
  }
}