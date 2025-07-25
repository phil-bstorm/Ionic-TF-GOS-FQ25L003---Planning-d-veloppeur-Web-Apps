import { Component, computed, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, cart, barcode, camera } from 'ionicons/icons';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonBadge],
})
export class AppComponent {

  private readonly articleService = inject(ArticleService);

  // recalcule la valeur à chaque modification du signal (react: useMemo, vue: computed)
  nbArticles = computed(() => this.articleService.items().length);

  constructor() {
    addIcons({ home, cart, camera, barcode });
  }
}
