import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';

@NgModule() // 不写元数据
export class ServicesModule { // 元数据是根据不同情况变化的，没法在元数据中指定一套，所以通过静态方法返回一个module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService
      ]
    }
  }
 }
