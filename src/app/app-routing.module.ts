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
        path: 'financy',
        title: 'Finanças Divididas',
        loadComponent: async () =>
          (await import('src/app/domain/financy/pages/financy/financy.page'))
            .FinancyPage,
      },
    ],
    canMatch: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'portal', pathMatch: 'full' },
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
