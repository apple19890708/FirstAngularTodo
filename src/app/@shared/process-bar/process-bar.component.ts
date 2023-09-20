import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-process-bar',
  animations: [
    trigger('startEnd', [
      state('start', style({
        width: '0%'
      })),
      state('80', style({
        width: '80%'
      })),
      state('end', style({
        width: '100%'
      })),
      transition('* => 80', [
        animate('10s')
      ]),
      transition('* => end', [
        animate('0.3s')
      ]),
      transition('* => start', [
        animate('0s')
      ]),
    ]),
  ],
  templateUrl: './process-bar.component.html',
  styleUrls: ['./process-bar.component.scss']
})
export class ProcessBarComponent implements OnInit {
  status = 'start';
  show = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)) // 訂閱路由發生時發動訊息 過濾路由開始時做的事情
      .subscribe(() => {
        this.status = 'start';
        this.show = true;
        this.status = '80';
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))// 訂閱路由發生時發動訊息 過濾路由結束時做的事情
      .subscribe(() => {
        this.status = 'end';
        setTimeout(() => {
          this.show = false;
          this.status = 'start';
        }, 300);
        window.scrollTo(0, 0);
      });
  }
}
