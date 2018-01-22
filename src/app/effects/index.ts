import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effects';
import { ProjectEffects } from './project.effects';
import { TaskListEffects } from './task-list.effects';

@NgModule({
  imports: [
    EffectsModule.run(QuoteEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(ProjectEffects),
    EffectsModule.run(TaskListEffects),
  ]
})
export class AppEffectsModule { }