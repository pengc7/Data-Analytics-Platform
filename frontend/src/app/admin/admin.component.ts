import { Component } from '@angular/core';
import {ContactService} from "../shared/services/contact.service";
import {Msg} from "../shared/models/msg.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  msg: Msg[]=[];
  isAsc: boolean|undefined;
  isDeleted: boolean|undefined;
  idArray : number[]=[];

  constructor(private cs: ContactService) {
      this.cs.getAllMsg().subscribe(res=>
      {if(res)
      {this.msg = res;
      this.idArray = this.msg.map(m=>m.id!)}});
    console.log(this.msg);
  }

  setAsc(){
    this.isAsc=true;
  }

  setDesc(){
    this.isAsc=false;
  }

  delete(id: number){
    this.cs.deleteMsg(id).subscribe(
      res=> {if (res)
       // this.isDeleted = res.success
      {const index = this.idArray.findIndex(i=>i===id);
       this.idArray.splice(index,1)}
      })
  }

  handle(id:number){
    this.cs.handleMsg(id).subscribe(res=>
    {
      if(res)
        console.log(res, 'this msg is handled!')
      this.delete(id); })
  }

  checkId(id: number){
    return this.idArray.includes(id);
  }
}
