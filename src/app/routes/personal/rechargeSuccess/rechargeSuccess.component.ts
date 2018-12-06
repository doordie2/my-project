import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-rechargeSuccess',
  templateUrl: './rechargeSuccess.component.html',
})
export class RechargeSuccessComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: _HttpClient, private router: Router, private location: PlatformLocation,private modalSrv: NzModalService,) {
  }
  locationUrl: String;
  obj:{};
  tradeNo:String;
  total_amount:Number;

  ngOnInit() {
    for (const i in this.location) {
      if (i === 'location') {
        this.locationUrl = this.location[i].href;
        break;
      }
    }

    this.obj=this.urlParse();
    this.tradeNo=this.obj['trade_no'];
    this.total_amount=this.obj['total_amount'];
  }

  urlParse() {
    let url = this.locationUrl
    let obj = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)
    // ['?id=12345','&a=b']
    if (arr) {
      arr.forEach((item) => {
        let tempArr = item.substr(1).split('=')
        let key = decodeURIComponent(tempArr[0])
        let val = decodeURIComponent(tempArr[1])
        obj[key] = val
      })
    }
    return obj
  }

  again(){
    this.router.navigateByUrl("/personal/center/settings/recharge");
  }

  history(){
    this.router.navigateByUrl("/personal/center/settings/rechargeRecord");
  }
}
