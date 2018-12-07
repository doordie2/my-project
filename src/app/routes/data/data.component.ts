import { Component, Inject, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';
import { DatePipe } from '@angular/common';
import { getTimeDistance } from '@delon/util';
import { BaseConfig } from '../../app.config';
const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-data',
  templateUrl: './allData.component.html',
  styleUrls: ['./allData.component.less'],
})
export class DataComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private datePipe:DatePipe
  ) {
  }
  display=false;

  //多条折线图配置
  data1;
  scale = [{
    dataKey: 'x',
  }];
  style = { stroke: '#fff', lineWidth: 1 };

  //单条折线图配置
  data2;
  scale2 = [{
    dataKey: 'x',
  }];


  todayUserCount:any={};
  yesterdayUserCount:any={};
  dailyRingRatio:String;
  dailyRingRatioStatus:String;
  sumCashRingRatio:String;
  sumCashRingRatioStatus:String;
  weekRatio:String;
  weekRatioStatus:String;
  datas: any = {
    salesData: [],
    offlineData: [],
  };
  loading = true;
  date_range: Date[] = [];
  name:String;
  radio;
  selectData;
  selectedValue;

  ngOnInit(): void{
    //获取客服列表
    this.http.get('http://localhost:81/v1/imweb/kf/listall').subscribe((res:any)=>{
      this.selectData=res.data;
    });
  }

  reload(day:number,kfId:number){
    this.loading=true;
    this.datas.salesData.length=0;
    this.datas.offlineData.length=0;

    this.http.get(BaseConfig.host+"/dataCount/getData",{day:day,kfId:kfId}).subscribe((res:any)=>{
      let dataList=res.data.data;
      this.todayUserCount=res.data.todayUserCount;
      //转化率
      this.radio=(this.todayUserCount.orderUserCount/this.todayUserCount.activeUserCount==0?1:this.todayUserCount.activeUserCount)*100;
      this.yesterdayUserCount=dataList[1];
      this.dailyRingRatio=res.data.dailyRingRatio;
      this.dailyRingRatioStatus=res.data.dailyRingRatioStatus;
      this.sumCashRingRatio=res.data.sumCashRingRatio;
      this.sumCashRingRatioStatus=res.data.sumCashRingRatioStatus;
      this.weekRatio=res.data.weekRatio;
      this.weekRatioStatus=res.data.weekRatioStatus;

      //日活量柱状图数据
      for (let i = dataList.length-1; i >=0; i--) {
        let x=this.datePipe.transform(dataList[i].createTime,"MM-dd");
        this.datas.salesData.push({
          x: x,
          dailyActivity: dataList[i].dailyActivity,
        });
      }
      let dv1 = new DataSet.View().source(this.datas.salesData);
      dv1.transform({
        type: 'fold',
        fields: ['dailyActivity'],
        key: 'city',
        value: 'temperature',
      });
      let data1=dv1.rows;
      this.data1 = data1;
      console.log("单条折线图"+JSON.stringify(this.data1))

      //佣金折线图和新增用户数量折线图
      for (let i = dataList.length-1; i >=0; i--) {
        this.datas.offlineData.push({
          x:this.datePipe.transform(dataList[i].createTime,"MM-dd"),//
          sumCash: dataList[i].sumCash,//
          newUserCount:dataList[i].newUserCount,//
        });
      }

      let dv = new DataSet.View().source(this.datas.offlineData);
      dv.transform({
        type: 'fold',
        fields: ['sumCash', 'newUserCount'],
        key: 'city',
        value: 'temperature',
      });
      let data2 = dv.rows;
      this.data2=data2;
      console.log("多条折线图"+JSON.stringify(this.data2))
    })
    this.loading = false;
    this.display=true;
  }



  setDate(type: any) {
    if (type=='-6'){
      this.reload(7,this.selectedValue)
    } else {
      this.reload(30,this.selectedValue);
    }
    this.date_range = getTimeDistance(type);
  }

  displays(){
    this.reload(7,this.selectedValue);
  }
}
