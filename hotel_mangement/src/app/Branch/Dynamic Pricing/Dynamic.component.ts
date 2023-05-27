import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { DynamicPrice } from 'src/app/model/DynamicPrice';

@Component({
    selector: 'dynamic-price',
    templateUrl: 'Dynamic.component.html',
    styleUrls:['Dynamic.component.css']
})

export class DynamicComponent implements OnInit {
    constructor(private repo:LoginRepository,private router:Router) { }

    ngOnInit() { }

    get dynamicPrice():DynamicPrice[]
    {
        return this.repo.getDynamicPrice()
    }
    
  back() {
    this.router.navigateByUrl('/main')
    // this.booking.emit();
  }
}