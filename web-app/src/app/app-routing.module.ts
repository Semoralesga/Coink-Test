import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { LoginGuard } from './login/login.guard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'menu',
    canActivate: [LoginGuard],
    component: MenuComponent,
  },
  { path: '**', redirectTo: '/menu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
