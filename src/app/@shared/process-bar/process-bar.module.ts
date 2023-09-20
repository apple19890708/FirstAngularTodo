import { ProcessBarComponent } from './process-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ProcessBarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule // 引入angular動畫
  ],
  exports:[
    ProcessBarComponent 
    // 如果希望將某個元件封裝在某個模組中，但在別的模組中的元件要能夠使用時，就需要使用exports: []
  ]
})
export class ProcessBarModule { }
