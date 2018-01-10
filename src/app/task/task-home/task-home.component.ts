import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from 'app/task/new-task-list/new-task-list.component';
import { HostBinding } from '@angular/core';
import { slideToRight } from "../../anims/router.anim"

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: 1,
      name: '代办',
      order: 1,
      tasks: [
        {
          id: 1,
          desc: '任务一：去星爸爸买咖啡',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务二：去电玩城打电动',
          completed: false,  
          priority: 2,          
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      order: 2,
      tasks: [
        {
          id: 1,
          desc: '任务三：好好睡一觉',
          completed: false, 
          priority: 1,          
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务四：吃一顿好吃的',
          completed: false,
          priority: 2,          
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }
      ]
    }
  ];

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建任务：'}});
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务：',task: task}});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表：', content: '您确认删除任务列表么？'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改任务列表：'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建任务列表：'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  handleMove(srcData, list) {
    console.log(srcData);
    switch(srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list': 
        console.log('handling list');
        const srcList = srcData.data;  // 源数据srcLData.data和传递过来的list数据的order交换
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default: 
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
