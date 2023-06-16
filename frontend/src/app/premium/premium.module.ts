import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { GroupComponent } from './group/group.component';
import { CompareChartComponent } from './group/compare-chart/compare-chart.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";

const routes: Routes=[
  {
    path: '',
    component: GroupComponent
  }
];

@NgModule({
  declarations: [
    GroupComponent,
    CompareChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class PremiumModule { }
