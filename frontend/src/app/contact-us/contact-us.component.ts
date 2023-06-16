import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../shared/services/contact.service";
import {Msg} from "../shared/models/msg.model";
import {Route, Router} from "@angular/router";

@Component({
  selector:'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements  OnInit {
  contactFormInstance!: FormGroup;
  ufc!: FormControl;
  efc!: FormControl;
  mfc!: FormControl;
  msg!: Msg;

  isSent: boolean|undefined;
  constructor(private cs: ContactService,
              private router: Router) {
  }

  ngOnInit(){
    this.ufc = new FormControl('',[Validators.required]);
    this.efc = new FormControl('',[Validators.required, Validators.email]);
    this.mfc = new FormControl('',[Validators.required]);
    this.contactFormInstance = new FormGroup({
      username: this.ufc,
      email: this.efc,
      msg: this.mfc
    });
  }

  send(){
    const msg: Msg = {username: this.ufc.value,
      email: this.efc.value, message: this.mfc.value,
    timestmp: Date.now()}
    console.log(msg);
    this.cs.putMsg(msg).subscribe(res=>{
      this.isSent = res.success;}
    )

    //this.router.navigate(['contact-us']).catch()

  }

}
