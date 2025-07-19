// src/app/transloco-root.module.ts
import { NgModule } from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoModule,
  TranslocoService,
  translocoConfig
} from '@jsverse/transloco';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco.loader';

@NgModule({
  imports:[TranslocoModule],
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'ua','es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader
    }
  ]
})
export class TranslocoRootModule {
  constructor(private service: TranslocoService) {
    service.setDefaultLang('en');
  }
}
