import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {PostsService} from "../../../shared/services/posts.service";
import {DateRangePipe} from "../../../shared/pipes/date-range.pipe";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {

  @Input()
  info: any;

  newposts: Post[]|undefined;
  lineTitle!:string;
  lineData: any;
  lineChartData: any;
  lineChartOptions: any;
  lineChartLegend: any;
  //------------------------
  pieTitle!:string;
  pieData: any;
  pieChartData: any;
  pieChartOptions: any;
  pieChartLegend: any;

  //-----------------
  barTitle="Most Engaging Post Types";
  barData: any;
  barChartData: any;
  barChartOptions: any;
  barChartLegend: any;

  constructor(private ps: PostsService) {
  }

  ngOnInit() {
    this.info.start = this.info.start ? this.info.start : new Date("Sat Jan 15 2022");
    this.info.end = this.info.end ? this.info.end : new Date("Tue Jan 18 2022");
    this.newposts = this.setPosts(this.info.start, this.info.end);
    //console.log(this.info, this.newposts);

    //line chart
    this.lineData = this.ps.getData(this.newposts, this.info.start, this.info.end);
    this.setLineChartData();

    this.lineTitle = "Profile lifetime";
    this.lineChartOptions = {
      responsive: false,
      scales: {
        y1: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y2: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        title: "Profile lifetime"
      }
    };

    this.lineChartLegend = true;
    //=======================================================
    //pie chart
    this.pieTitle = "Most Frequent Post Types";
    this.pieData = this.ps.getPostsData(this.newposts);
    this.setPieChartData();
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
    this.pieChartLegend = true;
    //============================
    //bar chart
    this.barData = this.ps.getEngData(this.newposts);
    this.setBarChartData();
    this.barChartOptions = {
      responsive: true
    }
  this.barChartLegend = false;

 }

    setLineChartData() {
      this.lineChartData = {
      datasets: [{
        type: 'line',
        data: this.lineData.data1,
        label: 'Engagements',
        borderColor: "coral",
        backgroundColor: "coral",
        fill: false,
        yAxisID: 'y1'
      },
        {
          type: 'bar',
          label: 'Posts',
          data: this.lineData.data2,
          borderColor: "rgb(255, 213, 128)",
          backgroundColor: "rgb(255, 213, 128)",
          yAxisID: 'y2'
        }],
      labels: this.lineData.dates
    };
  }

  setPieChartData() {
    this.pieChartData = {
      labels: this.pieData?Object.keys(this.pieData):[],
      datasets: [{
        data: this.pieData? Object.values(this.pieData):[],
      }],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
      ]
    }
  }

    setBarChartData() {
        this.barChartData = {
          labels: this.barData? Object.keys(this.barData):[],
          datasets: [{
            data: this.barData? Object.values(this.barData):[],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
           'rgb(255, 205, 86)']
          }]
        }}

     setPosts(start: Date, end: Date): Post[]|undefined {
        const dateRange = new DateRangePipe();
        return dateRange.transform(this.info.posts, start,end);
  }

  ngOnChanges(changes: SimpleChanges) {
   // console.log(changes['info'].currentValue.start, changes['info'].currentValue.end);
    if ((changes['info'].currentValue.start && changes['info'].currentValue.end) ||
    (!changes['info'].currentValue.start && !changes['info'].currentValue.end)) {

      this.info.start = this.info.start ? this.info.start : new Date("Sat Jan 15 2022");
      this.info.end = this.info.end ? this.info.end : new Date("Tue Jan 18 2022");
      this.newposts = this.setPosts(this.info.start, this.info.end);

      console.log(this.newposts?.length);
      this.newposts?.map(p=>console.log(p));
      this.lineData = this.ps.getData(this.newposts, this.info.start, this.info.end);
      this.setLineChartData();

      this.pieData = this.ps.getPostsData(this.newposts);
      this.setPieChartData();

      this.barData = this.ps.getEngData(this.newposts);
      this.setBarChartData();
    }
  }

}

