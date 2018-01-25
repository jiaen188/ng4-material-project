import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from 'app/task/new-task-list/new-task-list.component';
import { HostBinding } from '@angular/core';
import { slideToRight } from "../../anims/router.anim"
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../../domain/task-list.model';
import * as actions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';

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

  /* lists = [
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
  ]; */

  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;

  constructor(
    private dialog: MdDialog, 
    private cd: ChangeDetectorRef,
    private store$: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) { 
    this.projectId$ = this.route.paramMap.pluck('id');
    this.lists$ = this.store$.select(fromRoot.getTaskLists);
  }

  ngOnInit() {
  }

  launchNewTaskDialog(list) {
    // const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建任务：'}});

    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user); // 新建task的时候，我们先取出user
    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent, {data: {title: '新建任务：', owner: user}})) // 然后给弹出框 赋初始值 user 
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n)) // 同时监测 弹出框的关闭，如果是确定按钮， 就发出add task的action
      .subscribe(val => this.store$.dispatch(new taskActions.AddAction({...val, taskListId: list.id, completed: false, createDate: new Date()})))
  }

  launchCopyTaskDialog() {
    // const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务：',task: task}});
  }

  launchConfirmDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表：', content: '您确认删除任务列表么？'}});
    // dialogRef.afterClosed().subscribe(result => console.log(result));
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n) 
      .subscribe(result => this.store$.dispatch(new actions.DeleteAction(list)));
  }

  launchEditListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改任务列表：', taskList: list}});
    // dialogRef.afterClosed().subscribe(result => console.log(result));
    dialogRef.afterClosed()
    .take(1)
    .subscribe(result => this.store$.dispatch(new actions.UpdateAction({...result, id: list.id}))); // dialog传回来的result只含有name，我们要把id加上
  }

  launchNewListDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建任务列表：'}});
    // dialogRef.afterClosed().subscribe(result => console.log(result));
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store$.dispatch(new actions.AddAction(result)));
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
