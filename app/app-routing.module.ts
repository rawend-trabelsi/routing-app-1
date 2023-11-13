import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CatsComponent } from "./cats/cats.component";
import { DogsComponent } from "./dogs/dogs.component";
import { CatDetailsComponent } from './cat-details/cat-details.component';
import { EditCatComponent } from './edit-cat/edit-cat.component'; 



const routes: Routes = [
  { path: 'cats', component: CatsComponent },
  { path: 'dogs', component: DogsComponent },
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: 'details/:id', component: CatDetailsComponent },
  { path: 'edit-cat/:id', component: EditCatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
