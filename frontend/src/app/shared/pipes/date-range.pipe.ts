import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../models/post.model";

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform{
  transform(posts: Post[]|undefined, start: Date|undefined, end: Date|undefined): Post[]|undefined {
      start = start? start: new Date('Sat Jan 15 2022');
      end = end? end: new Date('Tue Jan 18 2022');
      //console.log(start?.getTime(), end?.getTime());
    return posts?.filter(p => {
      //console.log(p.date, new Date(p.date),new Date(p.date).getTime())
      return (new Date(p.date).getTime() <= end!.getTime() &&
        new Date(p.date).getTime() >= start!.getTime())
    });
  }


}
