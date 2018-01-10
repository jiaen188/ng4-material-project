import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from 'app/utils/svg.utils';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import 'rxjs/add/operator/take';

import 'hammerjs';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(), // 不写元数据，通过静态方法提供module
    BrowserAnimationsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue: 'http://localhost:3000'}
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载');
    }
    loadSvgResources(ir, ds);
  }
}
