import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocialService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { STColumn, STComponent, STData, STReq, STRes } from '@delon/abc';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rechargeRecord',
  templateUrl: './rechargeRecord.component.html',
  providers: [ SocialService ]
})
export class RechargeRecordComponent implements OnInit{

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
  ) {
  }

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data='http://localhost:81/center/getRechargeRecord';
  loading = false;
  status = [
    { index: 0, text: '支付宝', value: false, type: 'default', checked: false },
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
      total: 'data.total',
      list: 'data.list'
    },
    process:(data:STData[])=>
      data.map(i => {
        const statusItem = this.status[i.rechargeWay];
        i.statusText = statusItem.text;
        i.statusType = statusItem.type;
        return i;
      }),
  }
  columns: STColumn[] = [
    {
      title: '充值方式',
      index: 'rechargeWay',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter: any, record: any) => record.status === filter.index,
      },
    },
    { title: '充值金额', index: 'rechargeMoney' },
    {
      title: '充值时间',
      index: 'createTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.updatedAt - b.updatedAt,
      },
    }
  ];

  selectedRows: STData[] = [];
  totalCallNo = 0;
  selectedValue=0;

  selectData:any[]=[];


  ngOnInit(): void {
    //获取客服列表
    this.http.get('http://localhost:81/v1/imweb/kf/listall').subscribe((res:any)=>{
        this.selectData=res.data;
      }
    )
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
