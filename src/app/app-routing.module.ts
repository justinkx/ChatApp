import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], loadChildren: './Container/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './Container/login/login.module#LoginPageModule' },
  { path: 'create-channel', loadChildren: './Container/create-channel/create-channel.module#CreateChannelPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
