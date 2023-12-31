import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
 {
 path: 'home',
 loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
 },
 {
 path: '',
 redirectTo: '/login',
 pathMatch: 'full'
 },
 {
 path: 'login',
 loadChildren: () => import('./login/login.module').then( m =>
m.LoginPageModule),
 },
 {
  path: 'tamu',
  loadComponent: () => import('./tamu/tamu.page').then( m => m.TamuPage), canLoad: [AuthGuard]
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

];
@NgModule({
 imports: [
 RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }
