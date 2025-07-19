import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco.loader';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoRootModule } from './transloco-root.module';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['en','ua','es'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
]};
