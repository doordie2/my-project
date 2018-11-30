import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocialService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData, STReq, STRes } from '@delon/abc';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  providers: [ SocialService ]
})
export class PersonalComponent implements OnInit{

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private _message: NzMessageService,
  ) {
  }

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data='http://localhost:81/v1/imweb/robot/list';
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

  keyword:String;
  //定义请求的参数
  req: STReq = {
    reName: {
      pi: 'page',
      ps: 'size'
    },
    params:{
      keyword:this.keyword
    }
  }

  //定义返回的参数
  res: STRes = {
    reName: {
      total: 'data.length',
      list: 'data'
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
    { title: '', index: 'robotId', type: 'checkbox' },
    { title: '头像', index: 'robotWxIcon', type: 'img' },
    { title: '机器人微信昵称', index: 'robotNickName' },
    {
      title: '机器人备注',
      index: 'robotWxName',
    },
    {
      title: '所属客服',
      index: 'kfNickName',
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
    }
  ];

  selectedRows: STData[] = [];
  description = '';
  account = '';
  username = '';
  password = '';
  passwords = '';
  totalCallNo = 0;
  expandForm = false;
  robotWxIds:String[]=[];
  masstype=0;
  masstime=0;
  masstext:String;
  masskey:String;
  selectedValue=0;

  selectData:any[]=[];


  ngOnInit(): void {
    //获取客服列表
    this.http.get('http://localhost:81/v1/imweb/kf/listall').subscribe((res:any)=>{
        this.selectData=res.data;
      }
    )
  }

  /**
   * 客服设置
   * @param tpl
   */
  edit(tpl: TemplateRef<{}>) {
    if (this.selectedRows.length<1){
      this._message.error(`请选择账号`, { nzDuration: 1000 * 3 });
      return;
    }
    map((list: any[]) =>
      list.map(i => {
        const statusItem = this.status[i.status];
        i.statusText = statusItem.text;
        i.statusType = statusItem.type;
        return i;
      }),
    ),
    this.modalSrv.create({
      nzTitle: '设置一个客服',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post('http://localhost:81/v1/imweb/robot/addkf', null,{
            robotIds:this.selectedRows,
            kfId: this.selectedValue,
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe(() => {
            this.selectedRows=[];
            this.st.clearCheck();
            this.st.reload();
            this.loading=false;
          });
      },
      nzOnCancel:()=>{
        this.selectedRows=[];
        this.st.clearCheck();
      }
    });
  }

  /**
   * 群发消息
   * @param tpl
   */
  groupSend(tpl: TemplateRef<{}>){
    if (this.selectedRows.length<1){
      this._message.error(`请选择一个群发账号`, { nzDuration: 1000 * 3 });
      return;
    }
    this.modalSrv.create({
      nzTitle: '创建群发任务',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post('http://localhost:81/v1/imweb/robot/masssend', null,{
            robotWxIds:this.selectedRows,
            masstype: this.masstype,
            masstime: this.masstime,
            masstext: this.masstext,
            masskey:this.masskey
          },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe(() => {
            this.selectedRows=[];
            this.masstype=0;
            this.masstime=0;
            this.masstext='';
            this.masskey='';
            this.loading=false;
            this.st.clearCheck()
          });
      },
      nzOnCancel:()=>{
        this.selectedRows=[];
        this.st.clearCheck()
    }
    });
  }

  checkboxChange(list: STData[]) {
    list.map(i =>{
      this.selectedRows.push(i.robotId);
    } )
    this.totalCallNo = this.selectedRows.reduce(
      (total, cv) => total + cv.callNo,
      0,
    );
  }

}
