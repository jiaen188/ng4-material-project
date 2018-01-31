import { CoreModule } from './core/core.module';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MdSidenavModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MdSidenavModule,
        RouterModule.forRoot([]),
        CoreModule,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
  }));

  it('应该创建应用', async(() => {
    const fixture = TestBed.createComponent(AppComponent); // 创建组件
    const app = fixture.debugElement.componentInstance; // 获得实例对象
    expect(app).toBeTruthy();
  }));

  it('应该包含一个 .site 的元素', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; // 渲染之后的dom 节点元素
    expect(compiled.querySelector('.site')).toBeTruthy();
  }));
});
