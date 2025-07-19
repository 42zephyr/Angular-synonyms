import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoRootModule } from './transloco-root.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslocoRootModule ],
  template: `<div>

                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}
