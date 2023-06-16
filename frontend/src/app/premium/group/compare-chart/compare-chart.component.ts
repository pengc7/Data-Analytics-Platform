import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import {Post} from "../../../shared/models/post.model";
import {DateRangePipe} from "../../../shared/pipes/date-range.pipe";
import {ContactService} from "../../../shared/services/contact.service";
import {GroupService} from "../../../shared/services/group.service";

@Component({
  selector: 'app-compare-chart',
  templateUrl: './compare-chart.component.html',
  styleUrls: ['./compare-chart.component.scss']
})
export class CompareChartComponent implements OnInit, OnChanges, OnDestroy{
  @Input()
  info: any;

  postsData: any[]=[];
  posts: Post[][]=[];
  start: Date|undefined;
  end: Date|undefined;
  chartData: any;
  chartLegend: any;
  chartOptions: any;

  title="Timeline";

  constructor(private ps: PostsService,
              private group: GroupService) {
  }

  ngOnInit(): void {
    this.posts = this.info.postsGroup;
    console.log('init',this.info);

    this.chartOptions = {
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
      }
    }

    this.chartLegend = true;

    this.chartData = {
      datasets: [],
      labels: []
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.info);

 if (((changes['info'].currentValue.start  && changes['info'].currentValue.end) ||
   (!changes['info'].currentValue.start && !changes['info'].currentValue.end))){

   this.info.start = this.info.start? this.info.start : new Date("Sat Jan 15 2022");
   this.info.end = this.info.end? this.info.end: new Date("Tue Jan 18 2022");

 this.chartData = {
   datasets: [],
   labels: []
 }

 this.info.postsGroup.map((p:any)=>{
   const res1 = this.getChartData(p.post, this.info.start, this.info.end);
   this.setChartData(p.name, res1);
 })

}}

getChartData(post: Post[], start:Date|undefined, end:Date|undefined){
    start? start: new Date("Sat Jan 15 2022");
    end? end: new Date("Tue Jan 18 2022");
    const dateRange = new DateRangePipe();
    let newp = dateRange.transform(post, start, end);
    return this.ps.getData(newp, start, end);
  }

  setChartData(name: string, obj:any) {
      const data =
        {
          type: 'line',
          data: obj.data1,
          label: name+'_Engagements',
          //borderColor: "coral",
          //backgroundColor: "coral",
          fill: false,
          yAxisID: 'y1'
        }
        const data2=
        {
          type: 'bar',
          label: name+'_Posts',
          data: obj.data2,
         // borderColor: "rgb(255, 213, 128)",
          //backgroundColor: "rgb(255, 213, 128)",
          yAxisID: 'y2'
        }
        this.chartData.datasets.push(data);
        this.chartData.datasets.push(data2);
        this.chartData.labels = obj.dates;
    }

  ngOnDestroy(): void {
    this.group.clear();
  }


}
