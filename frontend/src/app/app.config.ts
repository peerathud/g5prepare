import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { DocumentsPage } from './pages/documents/documents.page';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  {path:'documents',component:DocumentsPage}
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient()]
};
