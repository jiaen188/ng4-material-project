import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MdToolbarModule,
   MdIconModule, 
   MdButtonModule, 
   MdCardModule,
   MdInputModule,
   MdListModule,
   MdSlideToggleModule,
   MdGridListModule,
   MdDialogModule,
   MdAutocompleteModule,
   MdMenuModule,
   MdCheckboxModule,
   MdTooltipModule,
   MdDatepickerModule,
   MdRadioModule,
   MdNativeDateModule,
   MdSelectModule,
   MdSidenavModule,
  } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

@NgModule({
  imports: [
    CommonModule, // 分享模块，只要导入这个就行
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,// 用material的自带的图标库需要引入这个模块
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    ImageListSelectComponent
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
