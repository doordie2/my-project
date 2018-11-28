import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData, STReq, STRes } from '@delon/abc';
import { SocialService } from '@delon/auth';
import { BaseConfig } from '../../app.config';
import { KfModalComponent } from './kf.modal.component';

@Component({
  selector: 'app-kf',
  templateUrl: './kf.component.html',
  providers: [SocialService],
})
export class KfComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
  ) {
  }

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data=BaseConfig.host+'/v1/imweb/kf/list';
  loading = false;
  status = [
    { index: false, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: true,
      text: '运行中',
      value: false,
      type: 'processing',
      checked: false,
    },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false },
  ];
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
    process:(data:STData[])=>
      data.map(i => {
        let t=i.online?0:1;
        const statusItem = this.status[t];
        i.statusText = statusItem.text;
        i.statusType = statusItem.type;
        return i;
      }),
  }
  columns: STColumn[] = [
    { title: '', index: 'kfId', type: 'checkbox' },
    { title: '头像', index: 'avatar', type: 'img' },
    { title: '昵称', index: 'kfNickName' },
    {
      title: '账号',
      index: 'kfAccessName',
    },
    {
      title: '状态',
      index: 'online',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter: any, record: any) => record.status === filter.index,
      },
    },
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
          icon:'edit',
          click:(item:any)=>this.modalSrv.create({
            nzTitle:"",
            nzContent:KfModalComponent,
            nzComponentParams: {
              item: item
            },
            nzFooter:null,
            nzOnOk:(kfModal)=>{
              kfModal.ok(this.st);
            }
          })
        },
        {
          text: '删除',
          click: (item: any) => this.modalSrv.create({
            nzTitle: '删除',
            nzContent: '<span>确定删除客服数据</span>',
            nzOnOk: () => {
              this.loading = true;
              this.http
                .post(BaseConfig.host+'/v1/imweb/kf/delete', null,{kfId: item.kfId })
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
  account = '';
  username = '';
  password = '';
  passwords = '';
  totalCallNo = 0;
  expandForm = false;

  ngOnInit() {
  }

  checkboxChange(list: STData[]) {
    this.selectedRows = list;
    this.totalCallNo = this.selectedRows.reduce(
      (total, cv) => total + cv.callNo,
      0,
    );
  }

  remove() {
    this.http
      .delete(BaseConfig.host+'/v1/imweb/kf/delete', { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        //this.getData();
      });
  }

  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }



  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '添加客服账号',
      nzContent: tpl,
      nzOnOk: () => {
        if (this.password != this.passwords) {
          return;
        }

        this.loading = true;
        this.http
          .post(BaseConfig.host+'/v1/imweb/kf/add', null,{
            accessName: this.account,
            nickName: this.username,
            password: this.password,
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe(() => {
            this.account='';
            this.username='';
            this.password='';
            this.loading = false;
            this.st.reload();
          });
      },
    });
  }

  reload() {
    this.st.reload();
  }
}
