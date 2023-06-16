import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Profile} from "../../shared/models/profile.model";
import {GroupService} from "../../shared/services/group.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PostsService} from "../../shared/services/posts.service";
import {Post} from "../../shared/models/post.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit{

  group: string[]|undefined;
  postsGroup: any[]=[];

  start: Date|null|undefined;
  end:Date|null|undefined;


  range = new FormGroup({
    start: new FormControl<Date | null>(new Date("Sat Jan 15 2022")),
    end: new FormControl<Date | null>(new Date("Tue Jan 18 2022")),
  });
  constructor(private gs: GroupService,
              private ps: PostsService) {
  }

  ngOnInit(){
    this.range.valueChanges.subscribe(v=>{
      this.start = v.start;
      this.end = v.end;
      //console.log(this.start, this.end)
      });

    this.group = this.gs.getGroup();
    this.group?.map((p:string)=>{
      this.ps.getPost(p).subscribe(res=>{
        if (res){
          const res1 = {name: p, post:res};
          this.postsGroup= [...this.postsGroup, res1];
          console.log('group', this.postsGroup);
        }
      })
    })
  }

}
