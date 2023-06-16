import {
  AfterContentChecked, AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {Profile} from "../../shared/models/profile.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfilesService} from "../../shared/services/profiles.service";
import {FormControl, FormGroup} from "@angular/forms";
import {range, switchMap} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {FollowerCount} from "../../shared/models/followerCount.model";
import {Post} from "../../shared/models/post.model";
import {Chart, ChartType} from 'chart.js';
import {canvas} from "chart.js/helpers";
import {PostsService} from "../../shared/services/posts.service";
import {DateRangePipe} from "../../shared/pipes/date-range.pipe";

@Component({
  selector:'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls:['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit{
  profile: Profile|undefined;
  name!: string;
  posts: Post[]|undefined;
  //newposts: Post[]|undefined;
  fcount: number=0;
  pcount: number=0;
  info: object={};
  start!: Date|null;
  end!: Date|null;
  constructor(private ar: ActivatedRoute,
              private ps: ProfilesService,
              private postsService: PostsService) {
  }

  range = new FormGroup({
    start: new FormControl<Date | null>( new Date("Sat Jan 15 2022")),
    end: new FormControl<Date | null>( new Date("Tue Jan 18 2022")),
  });

  ngOnInit(): void {
    /*     this.name = this.ar.snapshot.params['name'];
         console.log(this.name);
         this.ps.getProfile(this.name)
           .subscribe(profile=>{this.profile=profile;
           console.log(profile)});*/

    /*this.range.valueChanges.subscribe(
      range=> {
        this.posts = this.postsService.selectPosts(this.posts, range.start, range.end);
      });*/

/*    const dateRange = new DateRangePipe();
    this.start = this.range.get('start')!.value;
    this.end = this.range.get('end')!.value;*/

    this.ar.paramMap
      .pipe(switchMap(params => {
        this.name = (params.get('name'))!;
        return this.ps.getProfile(this.name);
      }))
      .subscribe(profile => {
        this.profile = profile;
      });

    this.ps.getFollowerCount(this.name)
      .subscribe(res => {
        if (res) {
          this.fcount = res?.reduce((sum, r) => sum + r.count, 0)
        } else {
          this.fcount = 0
        }
      });

    this.postsService.getPost(this.name)
      .subscribe(res => {
        if (res) {
          this.posts = res;
          //console.log(this.posts);
          this.pcount = res?.reduce((sum, p) => sum + p.number_of_engagement, 0);
        } else this.pcount = 0
      });
  }


}
