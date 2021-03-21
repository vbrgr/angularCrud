import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
      { path: 'home/:params', component: HomeComponent, pathMatch: 'full'},
      { path: 'home/:params/:id', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
