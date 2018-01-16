import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { getAuthState } from '../reducers';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthGuardService implements CanActivate { // 路由守卫
 
  constructor(private store$: Store<fromRoot.State>) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return Observable.of(true);
    return this.store$
      .select(getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined;
        if (result) {
          this.store$.dispatch(go(['/login']));
        }
        return result;
      })
      .defaultIfEmpty(false);
  }
}
