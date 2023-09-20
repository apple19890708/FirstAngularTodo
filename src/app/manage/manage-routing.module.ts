import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { AuthGuard } from '../@guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    canActivateChild: [AuthGuard], // 注意 原本已經進入manage 再透過其他分頁登出，這時候子路由一樣能work，所以 interceptor 一樣要做設定或做一個子路由守衛
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
