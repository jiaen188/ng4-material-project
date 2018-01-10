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
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }


}
