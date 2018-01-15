import { Component, OnInit, Input, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Address } from '../../domain';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getProvinces, getCitiesByProvince, getAreaByCity } from '../../utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush  
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  sub: Subscription;
  private propagateChange = (_: any) => { };
  
  constructor() { }

  ngOnInit() {
    // 将 省份，城市， 县区，街道， 四个流合并，当都有值，或者有值并且变化后，就在订阅中发射出去
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      
      return {
        province: _p,
        city: _c,
        district: _s,
        street: _s
      };
    });

    this.sub = val$.subscribe(v => {
      this.propagateChange(v);  // 把值发射出去，让外部知道变化；
    });

    // 初始化 省份， 城市， 县区  列表
    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.map((p: string) => getCitiesByProvince(p)); // 获取城市列表，要根据用户选择的省份
    this.districts$ = Observable.combineLatest(province$, city$, (p: string, c: string) => getAreaByCity(p, c)); // 获取区县，要根据用户选择的，省份 和城市
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // 从外部把值发射进来，然后绑定到本地的dom上
  writeValue(obj: Address): void {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province);        
      }
      if (this._address.city) {
        this._city.next(this._address.city);        
      }
      if (this._address.district) {
        this._district.next(this._address.district);        
      }
      if (this._address.street) {
        this._street.next(this._address.street);        
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  validate(c: FormControl): {[key: string]: any} {
    const val =c.value;
    if (!val) {
      return null;
    }
    if (val.province && val.city && val.district && val.street) {
      return null;
    }
    return {
      addressInvalid: true
    };
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }

}
