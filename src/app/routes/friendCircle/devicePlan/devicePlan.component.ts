import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  NzMessageService,
  NzModalService,
  UploadFile, UploadXHRArgs,
} from 'ng-zorro-antd';
import { STColumn, STComponent, STReq, STRes } from '@delon/abc';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseConfig } from '../../../app.config';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-devicePlan',
  templateUrl: './devicePlan.component.html',
  styleUrls: ['./devicePlan.component.less'],
})
export class DevicePlanComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private _message: NzMessageService,
    private router: Router,
    private https:HttpClient,
  ) {
  }

  form: FormGroup;
    selectedValue = 0;

  selectData: any[] = [];
  loading = false;

  ngOnInit(): void {

  }


  data = BaseConfig.host + '/v1/imweb/kf/list';
  @ViewChild('st')
  st: STComponent;

  //定义请求的参数
  req: STReq = {
    reName: {
      pi: 'page',
      ps: 'size',
    },
  };

  //定义返回的参数
  res: STRes = {
    reName: {
      total: 'data.total',
      list: 'data.list',
    },
  };
  columns: STColumn[] = [
    { title: '头像', index: 'avatar',width:'500px'},
    { title: '昵称', index: 'kfNickName' },
    {
      title: '账号',
      index: 'kfAccessName',
    },
    {
      title: '状态', index: 'online',
    }, {
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
          text: '删除',
          click: (item: any) => this.modalSrv.create({
            nzTitle: '删除',
            nzContent: '<span>确定删除设备方案</span>',
            nzOnOk: () => {
              this.loading = true;
              this.http
                .post(BaseConfig.host + '/v1/imweb/kf/delete', null, { kfId: item.kfId })
                .subscribe(() => {
                  this.st.reload();
                });
            },
          }),
        },
      ],
    },
  ];


  checkOptionsOne = [];
  device=[];

  add(tpl: TemplateRef<{}>) {
    for (let x = 0; x < 1000; x++) {
      this.checkOptionsOne.push({
        label: x,
          value: x,
        },
      );
    }
    this.modalSrv.create({
      nzTitle: '添加客服账号',
      nzContent: tpl,
      nzWidth: 1400,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post(BaseConfig.host + '/v1/imweb/kf/add', null, {}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .subscribe(() => {
            this.loading = false;
            this.st.reload();
          });
      },
    });
  }
}
