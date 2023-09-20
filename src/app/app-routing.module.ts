import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// 有用 loadChildren 後可移除原先在這邊引入的component

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
    // 將功能模組化，細部設定將改成在 manage-routing.module 處理
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },// 環境沒有指定的路由時，轉到預設路徑
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
