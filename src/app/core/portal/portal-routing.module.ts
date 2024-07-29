import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPage } from './pages/portal/portal.page';

const routes: Routes = [
  {
    path: '',
    component: PortalPage,
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
              'src/app/standalone/dashboard/pages/dashboard/dashboard.page'
            )
          ).DashboardPage,
      },
      {
        path: 'painel-controle',
        title: 'Painel de Controle',
        loadComponent: async () =>
          (
            await import(
              'src/app/standalone/control-panel/pages/painel-controle/painel-controle.page'
            )
          ).PainelControlePage,
      },
      {
        path: 'auditoria-compras',
        title: 'Auditoria de Compras',
        loadComponent: async () =>
          (
            await import(
              'src/app/standalone/auditoria-compras/pages/auditoria-compras/auditoria-compras.page'
            )
          ).ConferenciaComprasPage,
      },
    ],
  },
  /*   { path: '**', redirectTo: 'portal/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'portal/dashboard', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
