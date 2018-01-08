import { trigger, state, transition, style, animate, keyframes, group, query, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnim', [
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}), // stagger 作用是，如果同时又多个需要运动的对象，会依次执行，而不是一次全部执行
    query(':enter', stagger(100, [
      animate('1s', style({opacity: 1}))
    ]), {optional: true}),
    query(':leave', style({opacity: 1}), {optional: true}),
    query(':leave', stagger(100, [
      animate('1s', style({opacity: 0}))
    ]), {optional: true})
  ]),
])