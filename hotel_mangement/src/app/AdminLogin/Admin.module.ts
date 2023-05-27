import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminNavigationPageComponent } from './AdminHomePage/AdminNavigationPage.component';
import { HotelComponent } from './HotelBranches/Hotel.component';


import { SettingsComponent } from './AdminSettings/Settings.component';
import { AddBranchComponent } from './Add Branch/add-branch.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';


let routing = RouterModule.forChild([
  {
    
    path: "adminhome",
    component: AdminNavigationPageComponent,
    children: [ //template
       {path:"hotel",component:HotelComponent},
       {path:"addadmin",component:AddAdminComponent},
        {path:"settings",component:SettingsComponent},
       {path:"addbranch",component:AddBranchComponent},
      { path: "**", redirectTo: "hotel" },
    ],
  },
  { path: "**", redirectTo: "adminhome" },
]);

@NgModule({
  imports: [
    MatDialogModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    AgGridModule,
    routing,
    FormsModule,
    MatSidenavModule,MatListModule
  ],
  exports: [],
  declarations: [AdminNavigationPageComponent,HotelComponent, SettingsComponent, AddBranchComponent,AddAdminComponent],
  providers: [],
})
export class AdminModule { }