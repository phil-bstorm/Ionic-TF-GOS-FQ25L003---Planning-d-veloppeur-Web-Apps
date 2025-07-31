import { Component, computed, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, cart, barcode, camera, key } from 'ionicons/icons';
import { ArticleService } from './services/article.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon,
    IonBadge,
  ],
})
export class AppComponent {
  private readonly articleService = inject(ArticleService);
  private readonly authService = inject(AuthService);

  // recalcule la valeur à chaque modification du signal (react: useMemo, vue: computed)
  nbArticles = computed(() => this.articleService.items().length);

  token = this.authService.token;

  constructor() {
    addIcons({ home, cart, camera, barcode, key });
  }
}
