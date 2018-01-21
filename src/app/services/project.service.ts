import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  // POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }

  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }

   // DELETE 要删除一个project，要删除所有的task-list，删除所有的任务task
   del(project: Project): Observable<Project> {  // 一般来说，一个project下，task-list不会很多，一个task-list下的task可能很多，所以删除task-list效率更高些
    const delTasks$ = Observable.from(project.taskLists ? project.taskLists : []) // 新建的project，还没有taskLists
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)) // 如果有新的task-list进来，原有的delete还是要做的，新的也做
      .count(); // 只会产生流里面的数量，一个值

    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project); // 返回输入的project
  }

  // GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    
    return this.http
      .get(uri, {params: {'members_like':userId}})
      .map(res => res.json() as Project[]);
  }

  invite(projectId: string, users: User[]): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    
    return this.http
      .get(uri)  // 先取得这个project
      .map(res => res.json())
      .switchMap((project: Project) => {
        const existingMembers = project.members; // 现在这个project的成员members
        const invitedIds = users.map(user => user.id); // 邀请人的成员users
        const newIds = _.union(existingMembers, invitedIds); // 将两个数组，取并集
        return this.http
        .patch(uri, JSON.stringify({members: newIds}), {headers: this.headers}) // 然后通过更新后的 project取更新project
        .map(res => res.json());
      });
  }
}