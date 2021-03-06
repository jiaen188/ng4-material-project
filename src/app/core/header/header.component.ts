import { Component, OnInit, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { getAuthState } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain/auth.model';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    // iconRegistry.addSvgIcon('gifts', sanitizer.bypassSecurityTrustResourceUrl('assets/gifts.svg'));
    // 在阿里巴巴上图标库中下载svg图标， 然后用上面两个模块就可以在http中引入我们下载的图标
    // 缺点：每个图标要用，所以重复操作，2.分散在各个组件中，难以管理。

    this.auth$ = this.store$.select(getAuthState);
   }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    this.store$.dispatch(new actions.LogoutAction(null));
  }

}
