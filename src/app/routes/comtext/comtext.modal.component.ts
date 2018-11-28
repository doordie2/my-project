import {
  Component, EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BaseConfig } from '../../app.config';
import { STComponent } from '@delon/abc';
import { KfComponent } from '../kf/kf.component';
import { ComtextComponent } from './comtext.component';

@Component({
  selector: `app-modal-syw`,
  template: `
    <div class="modal-header">
        <div class="modal-title">编辑快捷语</div>
    </div>
    <div>
      <nz-form-item>
        <nz-form-control>
          <label>快捷语类型</label>
          <input nz-input [(ngModel)]="marks" name="mark" placeholder="请输入快捷语类型" id="mark">
          <label>快捷语内容</label>
          <textarea nz-input [(ngModel)]="texts" name="text" placeholder="请输入快捷语内容" id="text" style="height: 150px"></textarea>
        </nz-form-control>
      </nz-form-item>
    </div>
    `,
})
export class ComtextModalComponent implements OnInit{
  @Input()
  item: any;

  @Output()
  texts:String;
  @Output()
  marks:String;

  recoveryId:String;

  constructor(private modal: NzModalRef,private http: _HttpClient) {}

  ngOnInit(){
    this.texts =this.item.recoverContent;
    this.marks=this.item.userId;
    this.recoveryId=this.item.recoveryId;
  }

  ok(st:STComponent){
    this.http.post(BaseConfig.host+"/v1/imweb/comtext/edit",null, {
      comId:this.recoveryId,
      text:this.texts,
      marks:this.marks
    }).subscribe(res =>{
      st.reload();
    } )
  }
  cancel() {
    this.modal.destroy();
  }
}
