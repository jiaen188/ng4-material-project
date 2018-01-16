import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
// import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from  '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  /* quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就感。全心全意努力定会胜利满满',
    en: 'Satisfaction lies in the effort , not in the attainment. Full effort is full victory',
    pic: '/assets/img/quote_fallback.jpg'
  }; */
  quote$: Observable<Quote>;

  constructor(
    private fb: FormBuilder, 
    // private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>) { 

    // this.quote$ = this.store$.select(state => state.quote.quote); // 我们从store中获取值，不关心顺序，只管拿，不管什么时候放，所以可以写在前面
    this.quote$ = this.store$.select(fromRoot.getQuote);

    // 我们在effect中处理了quote的LOAD，所以我们不用再这里用quoteService$ ,请求quote数据了。 可以直接dispatch
    /* // 获取每日一句的数据
    this.quoteService$
      .getQuote()
      // .subscribe(q => this.quote = q); // 原来我们是直接获取后赋值
      .subscribe(q => {
        // this.store$.dispatch({type: actions.QUOTE_SUCCESS, payload: q}); // 我们set这么一个最新的action出去
        this.store$.dispatch(new actions.LoadSucsessAction(q)); // 改成强类型
      }); */

      // 直接dispatch一个LOAD，effects会处理LOAD
      this.store$.dispatch(new actions.LoadAction(null));
  }

  ngOnInit() {
    /**this.form = new FormGroup({
      // email: new FormControl('wang@163.com', Validators.required), // 单个验证条件
      email: new FormControl('wang@163.com', Validators.compose([Validators.required, Validators.email])), // 多个验证条件
      password: new FormControl('', Validators.required)
    });**/

    this.form = this.fb.group({
      email: ['wang@local.dev', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    
    // this.form.controls['email'].setValidators(this.validate); // this.validate可以放在表单验证和其他验证一起，也可以在submit的时候在验证
    if (!valid) {
      return;
    }
    this.store$.dispatch(new authActions.LoginAction(value));
  }
}
