import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

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
