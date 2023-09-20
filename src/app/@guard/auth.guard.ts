import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = JSON.parse(window.atob(jwt.split('.')[1])); 
      // JWT 通常由三個部分組成，它們使用點 . 分隔開來，window.atob將 Base64 編碼的載荷部分解碼成原始的字串
      console.log('payload', payload)
      const exp = new Date(Number(payload.exp) * 1000);
      if (new Date() > exp) {
        alert('JWT已過期，請重新登入');
        return this.router.createUrlTree(['/login']);
      }
    } else {
      alert('尚未登入');
      return this.router.createUrlTree(['/login']);
    }
  
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state); // 如果子路由沒有要做特殊判斷，直接以父路由canActivate判斷就可以
  }
}
