import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就感。全心全意努力定会胜利满满',
    en: 'Satisfaction lies in the effort , not in the attainment. Full effort is full victory',
    pic: '/assets/img/quote_fallback.jpg'
  };

  constructor(private fb: FormBuilder, private quoteService$: QuoteService) { 
    // 获取每日一句的数据
    this.quoteService$
      .getQuote()
      .subscribe(q => this.quote = q);
  }

  ngOnInit() {
    /**this.form = new FormGroup({
      // email: new FormControl('wang@163.com', Validators.required), // 单个验证条件
      email: new FormControl('wang@163.com', Validators.compose([Validators.required, Validators.email])), // 多个验证条件
      password: new FormControl('', Validators.required)
    });**/

    this.form = this.fb.group({
      email: ['wang@local.dev', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    // this.form.controls['email'].setValidators(this.validate); // this.validate可以放在表单验证和其他验证一起，也可以在submit的时候在验证
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'the email must start with wang'
    }
  }

}
