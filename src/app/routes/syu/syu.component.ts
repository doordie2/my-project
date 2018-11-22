import { Component, OnInit } from '@angular/core';
import { getTimeDistance } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-syu',
  templateUrl: './syu.component.html',
  styleUrls: ['./syu.component.less'],
})
export class SyuComponent implements OnInit {
  data: any = {
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

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
  ) {}

  ngOnInit() {
    for (let i = 0; i < 12; i += 1) {
      this.data.salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
    /*this.http.get('/chart').subscribe((res: any) => {
      this.data = res;
      this.loading = false;
    });*/

    this.loading = false;
  }

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
  }
}
