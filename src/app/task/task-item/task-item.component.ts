import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Input, Output, EventEmitter, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener('mouseenter')
  onMouseenter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.widerPriority = 'in';
  }

}
