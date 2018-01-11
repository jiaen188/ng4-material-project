import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.mode';
import { Http } from '@angular/http';

@Injectable()
export class QuoteService {
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  getQuote():Observable<Quote> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random()*10)}`; 
    // 请求启动json-server服务后，获取'http://localhost:3000/quote/id  id是不同的数字，范围0-10
    return this.http.get(uri)
      .map(res => res.json() as Quote);
  }
}