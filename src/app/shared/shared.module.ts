import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule, // 分享模块，只要导入这个就行
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
  ],
  exports: [
    CommonModule,
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
  ],
  declarations: [ConfirmDialogComponent],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
