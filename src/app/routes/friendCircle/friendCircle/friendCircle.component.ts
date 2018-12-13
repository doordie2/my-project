import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  NzMessageService,
  NzModalService,
  UploadFile,
  UploadXHRArgs,
} from 'ng-zorro-antd';
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
  selector: 'app-friendCircle',
  templateUrl: './friendCircle.component.html',
  styleUrls: ['./friendCircle.component.less'],
})
export class FriendCircleComponent implements OnInit{

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


    console.log(this.form.value);
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
      uid:1,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid:2,
      url: 'http://www.baidu.com/yyy.png',
    },{
      uid:3,
    url: 'http://img5.imgtn.bdimg.com/it/u=1486955621,651015270&fm=26&gp=0.jpg',
    },
  ];
  previewImage = '';
  previewVisible = false;

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  a(file: UploadFile){
    alert(JSON.stringify(file))
  }

  onOk(result: Date): void {
    this.form.value.sendTime = result;
  }

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

  //输入地址获取图片
  onBlur(){
    this.http.get("http://www.taotongxue.cn/mobile/taobao/getPic?itemId="+this.form.value.content).subscribe((res:any)=>{
      console.log(JSON.stringify(res))
    })
  }

  //获取商品id
  onChange(){
    this.http.post(BaseConfig.host+"/back/sns/regex",null,{"regexText": this.form.value.content}).subscribe((res:any)=>{
      console.log(JSON.stringify(res))
    })
  }

  customReq = (item: UploadXHRArgs) => {
    alert(JSON.stringify(item))
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    formData.append('key', item.name);
    formData.append('token', item.name);
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: true
    });
    this.https.request(req).subscribe(()=>{

    })
  }

  del(item:any){
    for (let i=0;i<this.fileList.length;i++){
      if (this.fileList[i].uid==item.uid){
        this.fileList.splice(i,1);
      }
    }
  }

}
