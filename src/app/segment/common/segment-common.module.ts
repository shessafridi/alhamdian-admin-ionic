import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarWrapperComponent } from './navbar-wrapper/navbar-wrapper.component';
import { ListViewComponent } from './list-view/list-view.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { SaveDialogScaffoldComponent } from './save-dialog-scaffold/save-dialog-scaffold.component';

@NgModule({
  declarations: [
    NavbarWrapperComponent,
    ListViewComponent,
    SaveDialogScaffoldComponent,
  ],
  exports: [
    NavbarWrapperComponent,
    ListViewComponent,
    SaveDialogScaffoldComponent,
  ],
  imports: [CommonModule, IonicModule, MaterialModule],
})
export class SegmentCommonModule {}
