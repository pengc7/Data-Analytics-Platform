import {Pipe, PipeTransform} from "@angular/core";
import {Msg} from "../models/msg.model";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform{
  transform(msg: Msg[], order:string): any[] {
    if (order==='asc') {
      return msg.sort((a, b) => (a.timestmp < b.timestmp ? -1 : 1));
    } else {
      return msg.sort((a, b) => (a.timestmp < b.timestmp ? 1 : -1));
    }
  }

}
