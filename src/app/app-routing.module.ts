import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'acesso', pathMatch: 'full' },
  { path: 'lista', loadChildren: './list/list.module#ListPageModule' },
  { path: 'acesso', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'filtros', loadChildren: './filters/filters.module#FiltersPageModule' },
  { path: 'detalhes', loadChildren: './detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
