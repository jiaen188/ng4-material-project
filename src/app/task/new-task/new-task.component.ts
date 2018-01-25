import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  title = '';

  priorities = [
    {
      label: '紧急',
      value: 1
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '普通',
      value: 3
    },
  ];
  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<NewTaskComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    // console.log(JSON.stringify(this.data.task));
    console.log("初始化new task");
    console.log(this.data);

    this.form = this.fb.group({
      desc: [this.data.task ? this.data.task.desc : '', Validators.required],
      priority: [this.data.task ? this.data.task.priority : 3, Validators.required],
      owner: [this.data.task ? [this.data.task.owner] : [this.data.owner]], // 前者是编辑时，赋值task的owner，后者是新建，默认是user本人作为owner
      followers: [this.data.task ? [...this.data.task.participants] : []],
      dueDate: [this.data.task ? this.data.task.dueDate : ''],
      reminder: [this.data.task ? this.data.task.reminder : ''],
      remark: [this.data.task ? this.data.task.remark : ''],
    });
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close({
      ...value,
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      participantIds: value.followers.map(f => f.id),
    });
  }

}
