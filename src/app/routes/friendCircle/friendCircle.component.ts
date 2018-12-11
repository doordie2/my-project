import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { STColumn, STComponent, STReq, STRes } from '@delon/abc';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseConfig } from '../../app.config';

@Component({
  selector: 'app-friendCircle',
  templateUrl: './friendCircle.component.html',
  styleUrls: ['./friendCircle.component.less'],
})
export class FriendCircleComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private _message: NzMessageService,
  ) {
  }

  form: FormGroup;
  forms: FormGroup;

  selectedValue = 0;

  selectData: any[] = [];

  controlArray: Array<{ id: number, controlInstance: string }> = [];
  comments = [];
  images = [];
  loading = false;

  indexData = 'asdasdasdsdasd';

  ngOnInit(): void {

    this.form = this.fb.group({
      content: [null, [Validators.required]],
      title: [null, [Validators.required]],
      sendTime: [null, [Validators.required]],
      device: [null, [Validators.required]],
      time: [null, [Validators.required]],
      comment: [this.comments],
      image: [],
    });

    this.controlArray[0] = {
      id: 0,
      controlInstance: 'passenger0',
    };

    this.form.addControl(this.controlArray[0].controlInstance, new FormControl(this.indexData, Validators.required));
  }

  submit() {
    for (let i = 0; i < this.controlArray.length; i++) {
      let a = this.controlArray[i].controlInstance;
      let b = this.form.value[a];
      this.comments.push(b);
    }

    for (let j = 0; j < this.fileList.length; j++) {
      this.images.push(this.fileList[j].url);
    }


    console.log(this.form.value.say);
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`,
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[this.controlArray.length - 1]);
    this.form.addControl(this.controlArray[index - 1].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number, controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      this.form.removeControl(i.controlInstance);
    }
  }

  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];
  previewImage = '';
  previewVisible = false;

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  onOk(result: Date): void {
    this.form.value.sendTime = result;
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

  log(value: object[]): void {
    this.device=[];
    for (let y=0;y<value.length;y++){
      if (value[y]['checked']){
        this.device.push(value[y]['label'])
      }
    }
    console.log(this.device);
  }

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
