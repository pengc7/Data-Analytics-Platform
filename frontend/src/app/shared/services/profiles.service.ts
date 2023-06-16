import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Profile} from "../models/profile.model";
import {FollowerCount} from "../models/followerCount.model";
import {Post} from "../models/post.model";

@Injectable()
export class ProfilesService {

  /*private profiles = [
    {"name":"AquaStarSolutions","logo":"https://as1.ftcdn.net/v2/jpg/02/30/55/60/1000_F_230556000_tyBRwOYMk9otbFVGkjan8i8TgI5Wl1JV.jpg","descrp":"Innovative water solutions for a better world","url":"www.aquastarsolutions.com"},
    {"name":"DigitalMindscape","logo":"https://as2.ftcdn.net/v2/jpg/03/21/86/29/1000_F_321862930_cHhKbUXlVVl6JukyyoGcMulDM6NhJ3Wl.jpg","descrp":"Enter a world beyond your imagination","url":"www.digitalmindspace.com"},
      {"name":"SolarisRobotics","logo":"https://as1.ftcdn.net/v2/jpg/03/04/58/26/1000_F_304582635_Ao9s9vfO3l9W2ut6jy93Ip9ylSePnMvn.jpg","descrp":"Leading the way in precision automation.","url":"www.solarisrobotics.com"}
  ]*/
  constructor(public httpClient: HttpClient) {

  }
  /*  getProfiles() :Observable<Profile[]|undefined> { //: Profile[]|undefined
      //return this.profiles;
      return this.httpClient.get<Profile[]>(`${environment.api_url}/companies`);
    }*/

  getProfile(name:string): Observable<Profile|undefined> {//
    return this.httpClient.get<Profile>(`${environment.api_url}/companies/${name}`,
      {withCredentials:true}
    );
  }

  getProfiles():Observable<Profile[]|undefined> {
    return this.httpClient.get<Profile[]>(`${environment.api_url}/companies`,
      {withCredentials:true}
    );
  }

  getFollowerCount(name: string): Observable<FollowerCount[]|undefined>{
    return this.httpClient.get<FollowerCount[]>(`${environment.api_url}/follower_counts/${name}`,{withCredentials: true});
  }



}
