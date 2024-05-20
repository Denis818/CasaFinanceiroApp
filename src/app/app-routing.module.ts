import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './core/pages/home/home.page';
import { AuthGuard } from './domain/auth/guards/auth.guard';
import { LoginComponent } from './domain/auth/pages/login/login.component';

const routes: Routes = [
  {
    path: 'portal',
    title: 'Finanças de casa',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: async () =>
          (
            await import(
              'src/app/domain/dashboard/pages/dashboard/dashboard.page'
            )
          ).DashboardPage,
      },
      {
        path: 'painel',
        title: 'Painel de Controle',
        loadComponent: async () =>
          (
            await import(
              'src/app/domain/painel-controle/pages/painel-controle/painel-controle.page'
            )
          ).PainelControlePage,
      },
      {
        path: 'conferencia-compras',
        title: 'Conferência de Compras',
        loadComponent: async () =>
          (
            await import(
              'src/app/domain/conferencia-compras/pages/conferencia-compras/conferencia-compras.page'
            )
          ).ConferenciaComprasPage,
      },
    ],
    canMatch: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'portal/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'portal/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
