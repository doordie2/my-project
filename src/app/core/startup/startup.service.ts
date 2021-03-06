import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([appData]) => {
          resolve(null);
          return [appData];
      })
    ).subscribe(([appData]) => {

      // application data
      const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(res.app);
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      this.menuService.add(res.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = res.app.name;
    },
    () => { },
    () => {
      resolve(null);
    });
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `eco`,
      description: `eco`
    };
    const user: any = {
      name: this.tokenService.get()['name'],
      avatar: './assets/tmp/img/avatar.jpg',
      email: this.tokenService.get()['email'],
      token: this.tokenService.get()['token']
    };

    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    this.settingService.setUser(user);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: '首页',
        group: true,
        children: [
          {
            text: '总量统计',
            link: '/allData',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '客服统计',
            link: '/data',
            icon: { type: 'icon', value: 'appstore' }
          },{
            text: '客服管理',
            link: '/kf',
            icon: { type: 'icon', value: 'info' }
          },
          {
            text: '账号管理',
            link: '/account',
            icon: { type: 'icon', value: 'bulb' }
          },{
            text: '快捷语',
            link: '/comtext',
            icon: { type: 'icon', value: 'edit' }
          },/*{
            text: '群发助手',
            link: '/group',
            icon: { type: 'icon', value: 'rocket' }
          },*/{
            text: '个人中心',
            link: '/personal/center/settings',
            icon: { type: 'icon', value: 'rocket' }
          },{
            text: '朋友圈',
            link: '/friend/center/setting',
            icon: { type: 'icon', value: 'rocket' }
          }
        ]
      }
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      this.viaMock(resolve, reject);

    });
  }
}
