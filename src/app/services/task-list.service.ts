import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

  // POST
  add(taskList: TaskList): Observable<TaskList> {
    // taskList.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), { headers: this.headers })
      .map(res => res.json());
  }

  // PUT
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res.json());
  }

  // DELETE 
  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/taskLists/${taskList.id}`;

    return this.http.delete(uri)
      .mapTo(taskList); // 返回输入的taskList
  }

  // GET
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;

    return this.http
      .get(uri, { params: { 'projectId': projectId } })
      .map(res => res.json() as TaskList[]);
  }

  // 交换task-list的顺序，先把drag的order更新成target的order，  再把target的order更新成drag的order，  最后返回tasklists数组列表
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
      .map(res => res.json());
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
      .map(res => res.json());

    return Observable
      .concat(drag$, drop$)
      .reduce((arrs, list) => [...arrs, list], []);
  }
}