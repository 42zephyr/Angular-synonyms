import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { notComponent } from './not.component';

export const routes: Routes = [
  { path: '', redirectTo: 'syns/en', pathMatch: 'full' },
  { path: 'syns/:lang', component: MainComponent },
    { path: 'ua', component: notComponent },
  { path: '**', component: notComponent }
];
