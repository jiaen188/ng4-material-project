import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

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
    const delTasks$ = Observable.from(project.taskLists)
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
}