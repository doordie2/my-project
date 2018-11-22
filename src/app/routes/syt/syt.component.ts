import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData } from '@delon/abc';
import { map, tap } from 'rxjs/operators';
import { SocialService } from '@delon/auth';

@Component({
  selector: 'app-syt',
  templateUrl: './syt.component.html',
  providers: [SocialService],
})
export class SytComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private socialService: SocialService,
  ) {
  }

  salesData: any[] = [];

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
  loading = false;
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: 1,
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
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: '头像', index: 'avatar', type: 'img' },
    { title: '昵称', index: 'description' },
    {
      title: '账号',
      index: 'callNo',
      type: 'number',
      format: (item: any) => `${item.callNo} 万`,
      sorter: (a: any, b: any) => a.callNo - b.callNo,
    },
    {
      title: '状态',
      index: 'status',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter: any, record: any) => record.status === filter.index,
      },
    },
    {
      title: '创建时间',
      index: 'updatedAt',
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
          click: (tpl: TemplateRef<{}>, item: any) => this.modalSrv.create({
            nzTitle: '编辑客服信息',
            nzContent: '<nz-form-item>\n' +
              '    <nz-form-label nzFor="no">在这里可以添加客服</nz-form-label>\n' +
              '    <nz-form-control>\n' +
              '      <label>客服昵称</label>\n' +
              '      <input nz-input [(ngModel)]="username" name="username" placeholder="请输入客服昵称" id="no">\n' +
              '      <label>客服账号</label>\n' +
              '      <input nz-input [(ngModel)]="account" name="description" placeholder="请输入客服账号" id="no">\n' +
              '      <label>密码</label>\n' +
              '      <input nz-input [(ngModel)]="password" name="password" placeholder="请输入密码" id="no">\n' +
              '      <label>确认密码</label>\n' +
              '      <input nz-input [(ngModel)]="passwords" name="password" placeholder="请输入确认密码" id="no">\n' +
              '    </nz-form-control>\n' +
              '  </nz-form-item>',
            nzOnOk: () => {
              if (this.password != this.passwords) {
                return;
              }
              this.loading = true;
              this.http
                .post('/rule', {
                  account: this.account,
                  username: this.username,
                  password: this.password,
                })
                .subscribe(() => {
                  this.getData();
                });
            },
          }),
        },
        {
          text: '删除',
          click: (item: any) => this.modalSrv.create({
            nzTitle: '删除',
            nzContent: '<span>确定删除客服数据</span>',
            nzOnOk: () => {
              this.loading = true;
              this.http
                .post('/rule', { description: this.description })
                .subscribe(() => {
                  this.getData();
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
    this.getData();
  }


  getData() {

    let dataList=[];
    this.http
      .get('http://localhost:81/getDataList')
      .pipe(
        map((list: any) => {
          dataList = list.data;
          dataList.map(i => {
            const statusItem = this.status[i.status];
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          })
        }),tap(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.data = dataList;
      })
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
      .delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
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
          .post('/rule', {
            account: this.account,
            username: this.username,
            password: this.password,
          })
          .subscribe(() => {
            this.getData();
          });
      },
    });
  }

  reset(ls: any[]) {
    for (const item of ls) item.value = false;
    this.getData();
  }

}
