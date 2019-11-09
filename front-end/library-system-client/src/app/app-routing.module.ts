import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './common/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomepageComponent },

  { path: 'books', canActivate: [AuthGuard], loadChildren: () => import('./components/books/books.module').then(m => m.BooksModule)}

  // { path: 'not-found', component: NotFoundComponent },

  // { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
