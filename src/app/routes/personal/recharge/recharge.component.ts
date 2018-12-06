import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { BaseConfig } from '../../../app.config';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
})
export class RechargeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,private http: _HttpClient,private router: Router,private modalSrv: NzModalService,public msg: NzMessageService,) {}

  amount:Number;
    ngOnInit() {
  }
  _submitForm() {
      if (this.amount<= 0) {
        this.msg.error("请输入正整数");
        return;
      }
    window.open( BaseConfig.host+"/back/alipayorder/alipay?balance="+this.amount);
    this.add();
  }
  add() {
    this.modalSrv.create({
      nzTitle: '充值确认',
      nzContent: '<p>充值正在进行，可跳转充值记录查询历史</p>',
      nzOnOk: () => {
        this.router.navigateByUrl("/personal/center/settings/rechargeRecord");
      },
    });
  }
}
