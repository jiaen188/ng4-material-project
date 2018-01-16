import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms"
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { isValidDate } from '../../utils/date.util';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  items: string[];
  sub: Subscription;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16)}`;
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(d => `avatars:svg-${d}`);

    // 响应式表单验证
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1995-01-01'],
      address: [],
      identity: []
    });

    // 根据输入的 身份证 号码， 处理成对应的地址， 和 出生日期
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.form.get('identity').valid);

    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);

      if (isValidAddr(info.addrCode)) { // 根据身份证号码， 设置地址
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) { // 根据身份证号码， 设置出生日期
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault(); // 防止表单提交的默认行为
    if (!valid) { // 表单验证不通过不处理
      return;
    }
    console.log(value);
  }

}
