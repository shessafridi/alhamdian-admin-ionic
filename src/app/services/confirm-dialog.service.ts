import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, take } from 'rxjs';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(public dialog: MatDialog) {}

  async ask() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    const result: boolean | undefined = await lastValueFrom(
      dialogRef.afterClosed().pipe(take(1))
    );

    return !!result;
  }
}
