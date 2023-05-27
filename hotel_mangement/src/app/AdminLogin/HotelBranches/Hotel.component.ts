import { Component, OnInit } from '@angular/core';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Branch } from 'src/app/model/Branch';

@Component({
    selector: 'hotel',
    templateUrl: 'Hotel.component.html',
    styleUrls:['Hotel.component.css']
})

export class HotelComponent implements OnInit {
    constructor(private repo:LoginRepository) { 
        this.repo.getAllBranches()
    }
    get branches():Branch[]{
        return this.repo.returnAllBranches()
    }
    ngOnInit() { }
}