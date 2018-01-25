import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { HostBinding } from '@angular/core';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/project.action';

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
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;

  // projects;
  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;
  // sub: Subscription;
  constructor(
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    // private service$: ProjectService,
    private store$: Store<fromRoot.State>
  ) {
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.store$.dispatch(new actions.LoadAction(null));
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {
    /* this.sub = this.service$.get('1').subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck(); // 告诉angular在onpush模式下，这边依然需要脏值检测
    }); */
  }

  ngOnDestroy() {
    /* if (this.sub) {
      this.sub.unsubscribe();
    } */
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), img: selectedImg } }); // 打开dialog的时候传入 封面集合 和随意选中的默认封面

    // 这个时候返回后，add之后还是一个流，页面中没有添加成功
    /* // dialogRef 关闭之后    过滤一下，确保关闭的时候有值project
    dialogRef.afterClosed().filter(n => n).subscribe(project => {
      this.service$.add(project); // 这也是一个流，但是我们一般不再subscribe中，  再次subscribe

      // this.projects = [...this.projects, {id: 3, name: '一个新项目', desc: '这是一个新项目', coverImg: 'assets/img/covers/3.jpg'}]
      this.cd.markForCheck(); // 告诉angular在onpush模式下，这边依然需要检查
    }); */

    /* dialogRef.afterClosed()
      .take(1) // 不管是点击  保存 还是 关闭，我们只取 一个，所以不用 unsubscribe。
      .filter(n => n) // 过滤一下，确保关闭的时候有值project
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })) // 把封面的缩略图， 换成 大图
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck(); // 告诉angular在onpush模式下，这边依然需要检查
      }); */

      dialogRef.afterClosed()
      .take(1) // 不管是点击  保存 还是 关闭，我们只取 一个，所以不用 unsubscribe。
      .filter(n => n) // 过滤一下，确保关闭的时候有值project
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })) // 把封面的缩略图， 换成 大图
      .subscribe(project => {
        this.store$.dispatch(new actions.AddAction(project));
      }); 
  }

  launchInviteDialog(project: Project) {
    /* const dialogRef = this.dialog.open(InviteComponent, { data: { members: [] } });
    // dialogRef.afterClosed().subscribe(result => console.log(result)); */

    // 初始值是当前的用户，防止添加用户的时候，重复添加
    this.store$.select(fromRoot.getProjectUsers(project.id))
    .map(users => this.dialog.open(InviteComponent, { data: { members: users } }))
    .switchMap(dialogRef => dialogRef.afterClosed().take(1))
    .subscribe(val => this.store$.dispatch(new actions.InviteAction({projectId: project.id, members: val})));
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), project: project } }); // 打开dialog的时候传入 封面集合 和 要编辑的 project

    dialogRef.afterClosed()
      /* .take(1) // 不管是点击  保存 还是 关闭，我们只取 一个，所以不用 unsubscribe。
      .filter(n => n) // 过滤一下，确保关闭的时候有值project
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) })) // 把封面的缩略图， 换成 大图
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)]
        this.cd.markForCheck(); // 告诉angular在onpush模式下，这边依然需要检查
      }); */

      .take(1) // 不管是点击  保存 还是 关闭，我们只取 一个，所以不用 unsubscribe。
      .filter(n => n) // 过滤一下，确保关闭的时候有值project
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) })) // 把封面的缩略图， 换成 大图
      .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project));
      }); 
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目：', content: '您确认删除项目么？' } });
    dialogRef.afterClosed()
      /* .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project)) // 我们不关心dialog返回的值， 我们关注在删除函数 ，返回的project
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
        this.cd.markForCheck();
      }); */

      .take(1)
      .filter(n => n)
      .subscribe(_ => {
        this.store$.dispatch(new actions.DeleteAction(project));        
      });
  }

  // 获取封面
  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  // 处理封面的链接，如果是缩略图  要换成 大图
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

  // 选择某个project，但是没有触发load tasklist的action （当然我们可以在下面接上一个load tasklist的action）
  // 但是更好的是，effects 是可以串联的。在project.effect中
  selectProject(project: Project) {
    this.store$.dispatch(new actions.SelectProjectAction(project));
  }
}
