import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ConfirmDialogService } from '../services/confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
