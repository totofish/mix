import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P1Component } from './p1/p1.component';
import { P2Component } from './p2/p2.component';

const routes: Routes = [
  { path: 'p2', component: P2Component },
  { path: '**', component: P1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
