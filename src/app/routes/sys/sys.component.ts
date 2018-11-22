import { Component, Inject, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sys',
  templateUrl: './sys.component.html',
})
export class SysComponent implements OnInit {

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
  sales: any[] = [];
  salesData: any[] = [];
  data: any[] = [];

  ngOnInit() {

    this.http.get('http://localhost:81/getData').subscribe((res: any) => {


      this.totalSales = res.data['totalSales'];
      this.serviceNum = res.data['serviceNum'];
      this.consultNum = res.data['consultNum'];
      this.reversionRate = res.data['reversionRate'];
    });

    this.http.get('http://localhost:81/getDatas').subscribe((res: any) => {
      this.salesData = res.data;
    });
  }
}
