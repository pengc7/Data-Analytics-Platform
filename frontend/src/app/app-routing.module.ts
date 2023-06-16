import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilesComponent} from "./profiles/profiles.component";
import {ProfileOverviewComponent} from "./profiles/profile-overview/profile-overview.component";
import {ProfileDetailComponent} from "./profiles/profile-detail/profile-detail.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {RegisterComponent} from "./register/register.component";
import {PremiumGuard} from "./shared/guards/premium.guard";
import {UpgradeComponent} from "./upgrade/upgrade.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: 'profile-detail/:name',
    component: ProfileDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'premium',
    loadChildren: ()=>import('./premium/premium.module').then(m=>m.PremiumModule),
    canActivate:[PremiumGuard]
  },
  {
    path:'upgrade',
    component: UpgradeComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
