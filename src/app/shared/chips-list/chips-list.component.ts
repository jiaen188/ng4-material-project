import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { User } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true;
  @Input() placeholderText =  '请输入成员 email';
  @Input() label = '添加/修改成员';
  form: FormGroup;
  items: User[] = [];
  memberResult$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });

    this.memberResult$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  private propagateChange = (_: any) => { };  

  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => ({...e, c}), {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj]; // 最后得到 写入的值，和原来items的 并集（其实就是为了防止重复添加一个人） 
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  validate(c: FormControl): {[key: string]: any} {
    return this.items ? null : {
      chipListInvalid: true
    };
  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  // 添加成员到数组当中
  handleMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) { // 如果选中的成员， 已经在数组中了，就什么都不做
      return;
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({memberSearch: member.name});
    this.propagateChange(this.items);
  }

  // 为了input中显示什么值。点了自动完成框的值后，在输入框里显示什么值，就是靠这个函数
  displayUser(user: User): string {
    return user ? user.name : '';
  }

  // 属性方法
  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
