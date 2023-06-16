import {Component, Input, OnInit} from "@angular/core";
import {Profile} from "../shared/models/profile.model";
import {ProfilesService} from "../shared/services/profiles.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/user.model";
import {FormControl} from "@angular/forms";
import {map,startWith} from "rxjs";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit{
  profiles: Profile[] | undefined;
  count: number=0;
  input: string='';
  profileShow: Profile[]|undefined;
  limit = false;
  maxlimit:number=2;
  names : string[]|undefined;
  user: User|undefined;
  isLoggedIn: boolean|undefined;
  isPremium: boolean|undefined;
  inputControl = new FormControl('');
  filteredProfiles : string[]|undefined;
  constructor(private ps: ProfilesService,
              private router:Router,
              private auth: AuthService) {
    this.auth.getStatus()
      .subscribe(res=>{!res && this.router.navigate(['/login']).catch();
      })
    if (this.auth.user) this.isPremium = this.auth.user!.types!.findIndex(t=>(t.type==='premium'||t.type==='admin'))>-1;
  }

  ngOnInit(): void {

    this.isPremium? this.maxlimit= 5: 2;

    this.ps.getProfiles().subscribe(res=> {if (res)
      this.profiles = res;}
    );

     this.inputControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value||''))
    ).subscribe(res=>this.filteredProfiles = res);
  }

  private _filter(value:string):string[]|undefined{
    const filterValue = value.toLowerCase();
    const profileNames = this.profiles?.map(p=>p.name);
    return profileNames?.filter(p=>p.toLowerCase().startsWith(filterValue));
  }

  addProfile():void{
    if (this.input && !this.names?.includes(this.input)){
      if  (!this.profileShow || (this.profileShow&& this.profileShow.length<this.maxlimit)) {
    this.ps.getProfile(this.input)
      .subscribe(profile=>{
        console.log(profile)
        if (profile)
        {
        this.profileShow = this.profileShow? [...this.profileShow, profile]: [profile];
        this.names = this.names? [...this.names, this.input]:[this.input];
        this.count = this.profileShow? this.profileShow.length:0;
      }
      })
  } else {
      this.limit=true;
    }
    }}


  deleteProfile(event: string){
    let index = this.names?.findIndex(name=> name===event);
    if (index===0 || (index && index!>-1)) {
      this.profileShow!.splice(index, 1);
      this.names!.splice(index, 1);
      this.count = this.profileShow? this.profileShow.length:0;
    }
  }










}
