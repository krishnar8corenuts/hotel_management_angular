import { Component, OnInit } from '@angular/core';
import { LoginRepository } from 'src/app/Services/DataRepository';
import { Login } from 'src/app/model/login';
import { NgForm } from '@angular/forms';
import { Admin } from '../model/Admin';
@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls:['admin.component.css']
})

export class AdminComponent implements OnInit {
    admin:Admin=new Admin();
    constructor(private repo:LoginRepository) { }

    ngOnInit() { }


    
    onSubmit(form:NgForm)
    {
        
        this.repo.verifyAdmin(this.admin.username,this.admin.password)

    }

}