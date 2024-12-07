import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TabsComponent } from './tabs/tabs.component';
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsComponent],
})
export class AppComponent {
  constructor() {
    defineCustomElement();
  }
}
