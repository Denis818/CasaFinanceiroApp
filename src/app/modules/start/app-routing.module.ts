import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPage } from 'src/app/core/portal/pages/portal/portal.page';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'portal',
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
              'src/app/standalone/control-panel/pages/control-panel/control-panel.page'
            )
          ).ControlPanelPage,
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
      {
        path: 'comparativo-faturas',
        title: 'Comparativo de Faturas',
        loadComponent: async () =>
          (
            await import(
              'src/app/standalone/comparativo-faturas/pages/comparativo-faturas/comparativo-faturas.page'
            )
          ).ComparativoFaturasPage,
      },
      {
        path: 'valores-a-receber',
        title: 'Valores a Receber',
        loadComponent: async () =>
          (await import('src/app/standalone/v2/compra/pages/compra.page'))
            .CompraPage,
      },
    ],
    canMatch: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
