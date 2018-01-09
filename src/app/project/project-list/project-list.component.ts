import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { HostBinding } from '@angular/core';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
  // changeDetection: ChangeDetectionStrategy.Default 
  // 默认是全局检查，然后设置onpush模式，相当于说告诉angular我这个list组件没有变换，不用检查我
  // 这个时候，点击增加按钮，没有新增，但是鼠标滑过list的时候，新增了。是因为item组件仍然是default模式
  // 当item上的mouseenter，mouseleave事件触发，就会触发检查机制，然后list也会检查到
  // 所以我们要在list的组件中新增，删除时告诉angular我这边是需要检查的，其他时候是onpush模式
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects = [
    {
      "id": 1,
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "id": 2,
      "name": "自动化测试",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/img/covers/1.jpg"
    },
  ];

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目：'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.projects = [...this.projects, {id: 3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/img/covers/3.jpg'}]
      this.cd.markForCheck(); // 告诉angular在onpush模式下，这边依然需要检查
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
    // dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchUpdateDialog() {
  const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目：'}});
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目：', content: '您确认删除项目么？'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();      
    });
  }

}
