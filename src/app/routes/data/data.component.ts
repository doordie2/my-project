import { Component, Inject, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { BaseConfig } from '../../app.config';
import { getTimeDistance } from '@delon/util';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
})
export class DataComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
  ) {
  }

  totalSales: String;
  serviceNum: String;
  consultNum: String;
  reversionRate: String;
  salesData: any[] = [];
  data: any[] = [];
  selectData:any[]=[];
  selectedValue:String;
  display=false;

  ngOnInit() {

    //获取客服列表
    this.http.get('http://localhost:81/v1/imweb/kf/listall').subscribe((res:any)=>{
      this.selectData=res.data;
    });

    this.http.get(BaseConfig.host+'/getData').subscribe((res: any) => {


      this.totalSales = res.data['totalSales'];
      this.serviceNum = res.data['serviceNum'];
      this.consultNum = res.data['consultNum'];
      this.reversionRate = res.data['reversionRate'];
    });

    this.http.get(BaseConfig.host+'/getDatas').subscribe((res: any) => {
      this.salesData = res.data;
    });

    for (let i = 0; i < 12; i += 1) {
      this.datas.salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
    this.loading = false;
  }

  datas: any = {
    salesData: [],
    offlineData: [],
  };
  loading = true;
  date_range: Date[] = [];
  rankingListData: any[] = Array(7)
    .fill({})
    .map((item, i) => {
      return {
        title: i,
        total: 323234,
      };
    });

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
  }

  displays(){
    this.display=true;
  }
}
