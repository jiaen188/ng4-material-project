import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isValid,
  isDate,
  isFuture,
} from 'date-fns';
import { isValidDate } from '../../utils/date.util'

export enum AgeUnit { //我们规定，用户输入的日期  和当前日期相减 后，如果是0-90天，天单位， 24个月内用，月单位，再大用岁
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 600;

  selectedUnit = AgeUnit.Year;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'},
  ];
  form: FormGroup;
  sub: Subscription;
  private propagateChange = (_: any) => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, form: 'birthday' };
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged() // 如果用户在输入修改后停顿了600ms，并且与上次输入不同，再发出流      
      .filter(_ => birthday.valid);

    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value) // 赋初始值
      .debounceTime(this.debounceTime)
      .distinctUntilChanged(); // 如果用户在输入修改后停顿了600ms，并且与上次输入不同，再发出流
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value) // 赋初始值
      .debounceTime(this.debounceTime)
      .distinctUntilChanged(); // 如果用户在输入修改后停顿了600ms，并且与上次输入不同，再发出流      
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({ age: _n, unit: _u });
      })
      .map(d => {
        return { date: d, form: "age" }; // 将年龄和单位两个流 合并 处理成一个流，统一成{date,form}的形式
      })
      .filter(_ => this.form.get('age').valid);

    const merged$ = Observable
      .merge(birthday$, age$) // 将age流 和 birthday流 再次合并成一个流，通过form来区分分别来自哪个流
      .filter(_ => this.form.valid);

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.form === 'birthday') { // 如果是来自 birthday流，将date转化成 {age, unit}, 然后分别和 表单中 ageNum的值， ageUnit的值比较处理
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date); // 然后把这个修改后的值发射出去

      } else { // 如果是来自 age流
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) { // 把 表单中 birthday的值转化成 {age, unit}，然后和 age流的{age, unit}比较处理
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  validate(c: FormControl): {[key: string]: any} {
    const val =c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    }
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
        birthdayInvalid: true
      };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    };
  }
  
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  toAge(dateStr: string): Age { //我们规定，用户输入的日期  和当前日期相减 后，如果是0-90天，天单位， 24个月内用，月单位，再大用岁单位
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ? // 如果当前时间 减去 90天 在传入的日期之前， 则用 天单位
      { age: differenceInDays(now, date), unit: AgeUnit.Day } :
      isBefore(subMonths(now, this.yearsTop), date) ?
        { age: differenceInMonths(now, date), unit: AgeUnit.Month } :
        {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        };
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }

}
