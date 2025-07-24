import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, cart, barcode, camera } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon],
})
export class AppComponent {
  constructor() {
    addIcons({ home, cart, camera, barcode });
  }
}
