import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {StripeScriptTag} from "stripe-angular";
import {HttpClient} from "@angular/common/http";
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {Appearance, PaymentIntent, StripeElementsOptions} from "@stripe/stripe-js";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit{
  upgraded: boolean|undefined;
 // paymentHandler:any = null;

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  paymentElementForm = this.fb.group({
    name: ['Full name', [Validators.required]],
    email: ['Email', [Validators.required]],
    address: [''],
    zipcode:['', [Validators.maxLength(5)]],
    city: ['']
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  start = false;

  paying = false;
  amount: number = 20;
  stripe: any;
  isPremium: boolean=false;
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ){
    this.auth.getStatus()
      .subscribe(res=>{!res && this.router.navigate(['/login']).catch();
      })
    this.auth.user? this.isPremium = this.auth.user!.types!.findIndex(t=>(t.type==='premium'||t.type==='admin'))>-1:
    this.router.navigate(['/login']).catch();
    //console.log(this.auth.user)
   }

  ngOnInit() {
    this.createPaymentIntent(this.amount)
      .subscribe(pi => {
       // console.log(pi);
        this.elementsOptions.clientSecret! = pi.client_secret!;
      });
  }

  setPay(){
    this.start = true;
  }
  pay() {
    if (this.paymentElementForm.valid) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentElementForm.get('name')?.value!,
              email: this.paymentElementForm.get('email')?.value!,
              address: {
                line1: this.paymentElementForm.get('address')?.value || '',
                postal_code: this.paymentElementForm.get('zipcode')?.value || '',
                city: this.paymentElementForm.get('city')?.value || '',
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        //console.log('Result', result);
       /* if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }*/
      });
    } else {
     // console.log(this.paymentElementForm);
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.api_url}/payment`,
      amount,
      {withCredentials:true}
    );
  }

  submit(){ //userInfo: NgForm
    const user = {username: this.auth.user?.username!, password: this.auth.user?.password!}; //userInfo.value;
    this.auth.update(user)
      .subscribe(res=> {this.upgraded=res.success;
      this.auth.user = res.user;
      console.log(res, this.auth.user);
      this.auth.logout();
      this.router.navigate(['/login']).catch()});
  }

}
