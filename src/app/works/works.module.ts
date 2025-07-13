import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { WorksRoutingModule } from './works-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from  '@angular/material/divider' ;
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    CardComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorksRoutingModule,
    MatIconModule,
    MatDividerModule,
    MaterialModule
  ],
  exports: [
    MatIconModule
  ]
})
export class WorksModule { }
