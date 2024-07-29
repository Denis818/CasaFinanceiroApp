import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { LoginPage } from '../auth/pages/login/login.page';

const routes: Routes = [
  {
    path: 'portal',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('src/app/core/portal/portal.module').then(
        (module) => module.PortalModule
      ),
  },
  { path: 'login', component: LoginPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
