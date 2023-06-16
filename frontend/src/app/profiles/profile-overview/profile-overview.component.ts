import {ColdObservable} from "rxjs/internal/testing/ColdObservable";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Profile} from "../../shared/models/profile.model";
import {switchMap} from "rxjs";
import {ProfilesService} from "../../shared/services/profiles.service";
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../../shared/services/posts.service";
import {GroupService} from "../../shared/services/group.service";

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit{
  @Input()
  profile: Profile | undefined;
  fcount: number|undefined;
  pcount: number|undefined;

  isSelected: boolean=false;

  @Output()
  sendData: EventEmitter<string> = new EventEmitter<string>();
  send(){
    this.sendData.emit(this.profile!.name);
  }
  constructor(private ps: ProfilesService,
              private postsService: PostsService,
              private ar: ActivatedRoute,
              private groupService: GroupService) {
  }

  ngOnInit(): void {
    console.log(this.profile);

    this.ar.paramMap
      .pipe(switchMap(params=>{
        return this.ps.getFollowerCount(this.profile!.name);
      }))
      .subscribe(res=>
      {if (res) {this.fcount=res?.reduce((sum,r)=>sum+r.count, 0)}
      else {this.fcount=0}});

    this.postsService.getPost(this.profile!.name)
      .subscribe(res=>
      {
        if(res){
        this.pcount=res?.reduce((sum,p)=>sum+p.number_of_engagement,0)}
      else this.pcount=0
      });

  }

  editGroup(){
    const name = this.profile!.name;
    if (this.isSelected && !this.groupService.checkInclude(name)) {
       this.groupService.add(name);
    } else {
      if (this.groupService.group?.includes(name)){
       this.groupService.delete(name);
      }}
    }
}


