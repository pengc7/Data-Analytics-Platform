import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ProfilesComponent} from "./profiles/profiles.component";
import {ProfileOverviewComponent} from "./profiles/profile-overview/profile-overview.component";
import {ProfilesService} from "./shared/services/profiles.service";
import {ProfileDetailComponent} from "./profiles/profile-detail/profile-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from "./shared/modules/custom-style/custom-style.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {LoginComponent} from "./login/login.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import { RegisterComponent } from './register/register.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { NgChartsModule } from 'ng2-charts';
import {PostsService} from "./shared/services/posts.service";
import { AdminComponent } from './admin/admin.component';
import {DateRangePipe} from "./shared/pipes/date-range.pipe";
import { ChartsComponent } from './profiles/profile-detail/charts/charts.component';
import {OrderByPipe} from "./shared/pipes/order-by.pipe";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {StripeModule} from "stripe-angular";
import {NgxStripeModule} from "ngx-stripe";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilesComponent,
    ProfileOverviewComponent,
    ProfileDetailComponent,
    HomeComponent,
    LoginComponent,
    ContactUsComponent,
    RegisterComponent,
    UpgradeComponent,
    AdminComponent,
    DateRangePipe,
    ChartsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomStyleModule,
    MatDatepickerModule,
    FormsModule,
    NgChartsModule,
    MatAutocompleteModule,
    StripeModule.forRoot("pk_test_51Mss9PBEwoP8IxfU2AMIMskw4t0vMJMaP0PNfBdqMCVpN7Uw1HtlqjHlFRTTn8e4apazqnnvx3qOVR0EIh5nX1Ui00oUgxMyFP"),
  NgxStripeModule.forRoot('pk_test_51Mss9PBEwoP8IxfU2AMIMskw4t0vMJMaP0PNfBdqMCVpN7Uw1HtlqjHlFRTTn8e4apazqnnvx3qOVR0EIh5nX1Ui00oUgxMyFP')
  ],
  providers: [ProfilesService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
