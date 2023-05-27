
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignInComponent } from './SignIn.component';
import { DatePipe } from '@angular/common';
import { HomePageComponent } from '../HomeCaurosel/HomePage.component';
import { AdminComponent } from '../AdminLogin/admin.component';


@NgModule({
    imports: [BrowserModule,FormsModule,RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
       MatGridListModule,
        MatFormFieldModule,
        BrowserAnimationsModule,

        MatCardModule,],
    exports: [HomePageComponent],
    declarations: [SignInComponent,HomePageComponent,AdminComponent],
    providers: [DatePipe],
})
export class SignInModule { }
