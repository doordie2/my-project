import { Component, Inject, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { BaseConfig } from '../../app.config';
import { getTimeDistance } from '@delon/util';

@Component({
  selector: 'app-data',
  templateUrl: './allData.component.html',
  styleUrls: ['./allData.component.less'],
})
export class AllDataComponent implements OnInit {

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
  chartData: any[] = [];

  ngOnInit() {

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
        y: Math.floor(Math.random() * 10)/100,
      });
    }

    this.loading = false;

    for (let i = 0; i < 120; i += 1) {
      this.chartData.push({
        x:(new Date().getTime()) + (1000 * 60 * 30 *24* i),
        y1: Math.floor(Math.random() * 100) + 10,
      });
    }
  }

  datas: any = {
    salesData: [],
    offlineData: [],
  };
  loading = true;
  date_range: Date[] = [];

  setDate(type: any) {
    this.loading=true;
    this.date_range = getTimeDistance(type);

    this.datas.salesData=[];
    for (let i = 0; i < 12; i += 1) {
      this.datas.salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 10) + 225,
      });
    }

    this.loading=false
  }
}
