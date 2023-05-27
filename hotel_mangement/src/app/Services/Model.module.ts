import { NgModule } from '@angular/core';
import { LoginRepository } from './DataRepository';
import { RestDataSource } from './RestDataLogin';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    imports: [HttpClientModule],
    exports: [],
    
    providers: [LoginRepository,RestDataSource],
})
export class ModelModule { }
