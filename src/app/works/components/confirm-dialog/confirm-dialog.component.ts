import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Work } from '../../interfaces/work.interface';


@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<Work>(MAT_DIALOG_DATA);
  readonly animal = model(this.data);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true);
  }
}
