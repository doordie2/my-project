import { Component, Inject, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { BaseConfig } from '../../app.config';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
  ) {
  }

  //totalSales:String="123456";

  totalSales: String;
  serviceNum: String;
  consultNum: String;
  reversionRate: String;
  salesData: any[] = [];
  data: any[] = [];

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
  }
}
