import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseConfig } from '../../app.config';
import { STComponent } from '@delon/abc';
import { KfComponent } from './kf.component';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: `app-modal-kf`,
  template: `
    <div class="modal-header">
        <div class="modal-title">编辑客服信息</div>
    </div>
    <div>
        <nz-form-item>
          <nz-form-control>
            <label>客服昵称</label>
            <input nz-input [(ngModel)]="usernames" name="username" placeholder="请输入客服昵称" id="username">
            <label>客服账号</label>
            <input nz-input [(ngModel)]="accounts" name="account" placeholder="请输入客服账号" id="account">
            <label>密码</label>
            <input nz-input [(ngModel)]="passwords" name="password" placeholder="请输入密码" id="password">
            <label>确认密码</label>
            <input nz-input [(ngModel)]="passwords" name="passwords" placeholder="请输入确认密码" id="passwords">
          </nz-form-control>
        </nz-form-item>
    </div>
    `,
})
export class KfModalComponent implements OnInit{
  @Input()
  item: any;

  usernames:String;
  accounts:String;
  passwords:String;

  kfId:String;

  constructor(private modal: NzModalRef,
              private http: _HttpClient,
              public msg: NzMessageService) {}

  ngOnInit(){
    this.usernames =this.item.kfNickName;
    this.accounts=this.item.kfAccessName;
    this.passwords=this.item.kfPassword;
    this.kfId=this.item.kfId;
  }

  ok(st:STComponent) {
    if(this.passwords==null){
      this.msg.error("如果修改，请输入密码");
      return;
    }
    this.http.post(BaseConfig.host+"/v1/imweb/kf/edit",null, {
      accessName:this.accounts,
      nickName:this.usernames,
      password:this.passwords,
      kfId:this.kfId
  }).subscribe(
      ()=>{
        this.cancel();
        st.reload();
      }
    )
  }
  cancel() {
    this.modal.destroy();
  }
}
