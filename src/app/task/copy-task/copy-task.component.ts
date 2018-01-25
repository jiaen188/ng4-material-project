import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {

  lists: any[];
  form: FormGroup

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<CopyTaskComponent>) { }

  ngOnInit() {
    this.lists = this.data.lists;
    this.form = this.fb.group({
      targetListId: []
    });
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value.targetListId);
  }

}
