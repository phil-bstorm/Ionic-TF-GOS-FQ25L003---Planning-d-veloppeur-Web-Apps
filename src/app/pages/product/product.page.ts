import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, ActionSheetController, AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonButton, IonInput, IonList, IonListHeader, ToastController } from '@ionic/angular/standalone';
import { cart, add, trash, checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonItem, IonInput, IonButton, IonList, IonListHeader]
})
export class ProductPage {

  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private actionSheetCtrl = inject(ActionSheetController);
  private articleService = inject(ArticleService);
  private loadingCtrl = inject(LoadingController);

  items = this.articleService.items;
  articleName: string|null = null;

  constructor() { 
    addIcons({ cart, add, trash, checkmarkCircle });

    // effectue une opération à chaque modification du signal (react: useEffect, vue: watchEffect)
    effect(async () => {
      const c = this.articleService.items().length;
      const toast = await this.toastCtrl.create({
        message: `La liste des articles a été modifiée, vous avez ${c} articles dans votre panier`,
        color: 'secondary',
        duration: 3000,
      });
      toast.present();
    });
  }

  private async showLoader() {
    const loader = await this.loadingCtrl.create({
      message: 'Chargement en cours'
    })
    loader.present();
    return loader;
  }

  async add() {
    if(!this.articleName) {
      const t = await this.toastCtrl.create({
        message: 'Le nom de l\'article doit être rempli',
        duration: 5000,
        color: 'danger',
        position: 'top'
      });
      t.present();
      return;
    }
    const loader = await this.showLoader();
    this.articleService.addItem(this.articleName).subscribe(_ => {
      this.articleName = null;
      loader.dismiss();
    });
  }

  async clearAll() {
    const alert = await this.alertCtrl.create({
      header: 'Attention !!',
      message: 'Confirmer la suppression de la liste ?',
      buttons: [
        { text: 'Annuler' },
        { text: 'Confirmer', handler: async () => {
          const loader = await this.showLoader();
          this.articleService.removeAll()
            .subscribe(() => loader.dismiss());
        } }
      ]
    })
    alert.present();
  }

  async showActions(item: any) {
    const as = await this.actionSheetCtrl.create({
      buttons: [
        { text: 'Cocher ou Décocher', handler: async () => {
          item.checked = !item.checked;
          const loader = await this.showLoader()
          this.articleService.updateItem(item)
            .subscribe(() => loader.dismiss());
        } },
        { text: 'Supprimer', role: 'destructive', handler: async () => {
          const loader = await this.showLoader();
          this.articleService.removeItem(item)
            .subscribe(() => loader.dismiss());
        } }
      ]
    });
    as.present();
  }

}
