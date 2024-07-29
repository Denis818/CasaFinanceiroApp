import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from 'src/app/core/home/pages/home/home.page';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { LoginPage } from '../auth/pages/login/login.page';

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
              'src/app/modules/dashboard/pages/dashboard/dashboard.page'
            )
          ).DashboardPage,
      },
      {
        path: 'painel',
        title: 'Painel de Controle',
        loadComponent: async () =>
          (
            await import(
              'src/app/modules/control-panel/pages/painel-controle/painel-controle.page'
            )
          ).PainelControlePage,
      },
      {
        path: 'auditoria-compras',
        title: 'Auditoria de Compras',
        loadComponent: async () =>
          (
            await import(
              'src/app/modules/auditoria-compras/pages/auditoria-compras/auditoria-compras.page'
            )
          ).ConferenciaComprasPage,
      },
    ],
    canMatch: [AuthGuard],
  },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: 'portal/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'portal/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
