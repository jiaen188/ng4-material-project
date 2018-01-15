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
   MdTabsModule,
  } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

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
    MdChipsModule,
    MdTabsModule,
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
    MdTabsModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent, 
    AreaListComponent
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent, 
    AgeInputComponent, 
    ChipsListComponent,
    IdentityInputComponent, 
    AreaListComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
