import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './error404/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'works',
    loadChildren: () => import('./works/works.module').then(m => m.WorksModule),
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
      path: '',
      redirectTo: 'works',
      pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
