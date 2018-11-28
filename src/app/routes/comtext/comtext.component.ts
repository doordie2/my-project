import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData, STReq, STRes } from '@delon/abc';
import { SocialService } from '@delon/auth';
import { ComtextModalComponent } from './comtext.modal.component';
import { BaseConfig } from '../../app.config';

@Component({
  selector: 'app-comtext',
  templateUrl: './comtext.component.html',
})
export class ComtextComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
  ) {
  }

  data=BaseConfig.host+'/v1/imweb/comtext/list';
  loading = false;
  @ViewChild('st')
  st: STComponent;

  //定义请求的参数
  req: STReq = {
    reName: {
      pi: 'page',
      ps: 'size'
    },
  }

  //定义返回的参数
  res: STRes = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
  }
  columns: STColumn[] = [
    { title: '', index: 'recoveryId', type: 'checkbox' },
    { title: '快捷语类型', index: 'userId'},
    { title: '快捷语内容', index: 'recoverContent',width:'400px' },
    {
      title: '创建时间',
      index: 'createTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.updatedAt - b.updatedAt,
      },
    },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          click:(item:any)=>this.modalSrv.create({
            nzTitle:"",
            nzContent:ComtextModalComponent,
            nzComponentParams: {
              item: item
            },
            nzOnOk:(kfModal)=>{
              kfModal.ok(this.st)
            }
          })
        },
        {
          text: '删除',
          click: (item: any) => this.modalSrv.create({
            nzTitle: '删除',
            nzContent: '<span>确定删除快捷语</span>',
            nzOnOk: () => {
              this.loading = true;
              this.http
                .post(BaseConfig.host+'/v1/imweb/comtext/delete', null,{comId: item.recoveryId })
                .subscribe(() => {
                  this.st.reload();
                });
            },
          }),
        },
      ],
    },
  ];

  selectedRows: STData[] = [];
  description = '';
  text = '';
  mark = '';
  totalCallNo = 0;
  ngOnInit() {
  }

  checkboxChange(list: STData[]) {
    this.selectedRows = list;
    this.totalCallNo = this.selectedRows.reduce(
      (total, cv) => total + cv.callNo,
      0,
    );
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '添加快捷语',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post(BaseConfig.host+'/v1/imweb/comtext/add', null,{
            text: this.text,
            mark: this.mark,
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe(() => {
            this.text='';
            this.mark='';
            this.loading = false;
            this.st.reload();
          });
      },
    });
  }

  reload() {
    this.st.reload()
  }
}
