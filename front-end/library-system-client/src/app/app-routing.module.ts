import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './common/auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomepageComponent },

  {
    path: 'books',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/books/books.module').then((m) => m.BooksModule)
  },

  { path: 'not-found', component: NotFoundComponent },

  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
