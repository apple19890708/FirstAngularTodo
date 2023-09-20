import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProcessBarModule } from './@shared/process-bar/process-bar.module';
import { InterceptorService } from './@services/interceptor.service';
// 有用 loadChildren 後可移除這裡的component，因為改成懶加載後不需在這裡做引入

@NgModule({
  declarations: [ 
    // 將**可宣告(declarable)**的類別放在這個設定中，跟樣板顯示有關的程式，
    // 某個元素上掛了一個指令(directive)，或是使用 管線(pipe)來改變呈現內容，這些都是跟樣板有關的
    // 顯示相關的程式類別都只能存在於一個模組之中，如果存在多個模組中時，編譯程式時就會發生錯誤
    // 如果希望將某個元件封裝在某個模組中，但在別的模組中的元件要能夠使用時，就需要使用另一個設定：exports: []
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    // 代表要使用哪些模組所提供的功能，例如我們常常使用的 ngModel ，就是在 FormsModule 裡面所提供的一個 directive
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProcessBarModule, // 在根 modules 引入
  ],
  providers: [
    { // 攔截器寫完成後記得要到 app.module.ts註冊
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ], // 用來決定哪些服務(service)允許被注入
  bootstrap: [AppComponent]
})
export class AppModule { }
