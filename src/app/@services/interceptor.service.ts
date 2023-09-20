import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = localStorage.getItem('jwt');

    if (jwt) { // 如果有取得JWT 在headers統一設定
      req = req.clone({
        headers: req.headers.set('Authorization', 'bearer ' + jwt)
      });
    }

    return next.handle(req).pipe( // 如果後端沒相關設定 就只會有 return next.handle(req)
      map(event => {
        if (event instanceof HttpResponse) { // 根據伺服器回傳事件做判斷
          switch (event.body.Status) {
            case 1: {
              event = this.success(event);
              break;
            }
            case 0: {// 一般錯誤
              event = this.error(event);
              break;
            }
            case -1: { // 未登錄錯誤，當未攜帶token或是 token過期 
              event = this.error(event);
              // this.router.navigate(['/login']); // 雖然有路由守衛來運作，但其可阻擋部分非常規操作
              break;
            }
          }
        }
        return event;
      })
    );
  }

  private success(event: any): any {
    if (event.body.Data) { // api data資料成功取得處理
      return event.clone({ body: event.body.Data }); // 過濾取得的資料 只留下Data，剩餘的Status
    } else {
      return event.clone({ body: true });
    }

  }

  private error(event: any): any {
    alert(event.body.Message);

    return event.clone({ body: false });
  }

} // 攔截器寫完成後記得要到 app.module.ts註冊