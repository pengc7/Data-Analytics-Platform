import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[]|undefined;
  pipe = new DatePipe('en-US');
  constructor(private httpClient: HttpClient) {
  }

  getPost(name: string): Observable<Post[]|undefined>{
    return this.httpClient.get<Post[]>(`${environment.api_url}/posts/${name}`,
      {withCredentials: true})
  }

  getPostsData(posts: Post[]|undefined){
    return (posts?.reduce<Record<string, number>>((res, p) => {
      if (!res[p.post_type]) {
        res[p.post_type] = 0;
      }
      res[p.post_type] += 1;
      return res;
    }, {}));
  }

  getEngData(posts:Post[]|undefined){
    return (posts?.reduce<Record<string, number>>((res, p) => {
      if (!res[p.post_type]) {
        res[p.post_type] = 0;
      }
      res[p.post_type] += p.number_of_engagement;
      return res;
    }, {}));
  }

  getData(posts:Post[]|undefined, start: any, end:any):{dates:string[], data1:number[], data2:number[]} {
      let dates : string[]=[];
      let data1 : number[]=[];
      let data2 : number[]=[];
      let ecount: number|undefined;
      let pcount: number|undefined;
      let currentDate = structuredClone(start);
      //console.log(currentDate);
      if (currentDate && end && currentDate<=end) {
        while (currentDate <= end) {
          dates.push(this.pipe.transform(currentDate, 'MMM/dd/yyyy')!);
          ecount = posts?.filter(p=> (new Date(p.date).getTime()===currentDate.getTime()))
            .reduce((res,p) =>(res+p.number_of_engagement), 0);
          //posts?.map(p=>console.log(p.date, new Date(p.date), new Date(p.date).getTime(), currentDate.getTime(),new Date(p.date).getTime()===currentDate.getTime()))
          //console.log('***', currentDate);

          data1.push(ecount? ecount:0);
          pcount = posts?.filter(p=> (new Date(p.date).getTime()===currentDate.getTime()))
            .reduce((res)=>(res+1),0);
          data2.push(pcount? pcount:0);
          currentDate.setDate(currentDate.getDate()+1);
      }}
      //console.log(start, currentDate);
      return {dates: dates, data1:data1, data2:data2}//{dates: dates, data:data};
    }

}
