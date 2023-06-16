import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GroupService{
  group: string[]=[];
  getGroup(){
    return this.group;
  }

  add(name: string){
    this.group.push(name);
    //console.log('added');
  }

  checkInclude(name:string){
    return this.group.includes(name);
  }

  delete(name:string){
    var index = this.group.findIndex(p=>p===name);
    this.group.splice(index,1);
  }

  clear(){
    this.group = [];
  }
}
