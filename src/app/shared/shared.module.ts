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
   MdButtonToggleModule,
   MdChipsModule,
  } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

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
    MdButtonToggleModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
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
    MdButtonToggleModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent, 
    AgeInputComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
