import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITokenModel, SocialService } from '@delon/auth';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-syv',
  templateUrl: './syv.component.html',
  providers: [ SocialService ]
})
export class SyvComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  type: string;

  constructor(
    private socialService: SocialService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router$ = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.mockModel();
    });
  }

  private mockModel() {
    this.socialService.callback({
      token: '123456789',
      name: 'cipchk',
      email: `${this.type}@${this.type}.com`,
      id: 10000,
      time: +new Date(),
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
