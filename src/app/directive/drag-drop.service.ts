import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

export interface DragData {
  tag: string; // 区别哪一级拖拽，为了支持多个拖拽物体时，确认哪一个
  data: any;
}

@Injectable()
export class DragDropService {

  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragData.next(data); // 拖得时候，我们放入最新的一个data，然后BehaviovrSubject会把过去的  最新的  事件重播，
  }                                                           //而ReplaySubject(n)会把过去的  n个  事件重播

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable(); // 放的时候，我们可以得到过去最新的事件
  }

  clearDragData() {
    this._dragData.next(null); // 清空，就是再放一个null进去， 然后在过去的最新序列中得到就是null了
  }
}
