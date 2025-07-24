import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonButton, IonInput, IonList, IonListHeader, ToastController } from '@ionic/angular/standalone';
import { cart, add, trash, checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpClient } from '@angular/common/http';

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
  private httpClient = inject(HttpClient);

  items = signal<any[]>([]);
  articleName: string|null = null;

  constructor() { 
    addIcons({ cart, add, trash, checkmarkCircle });
    this.httpClient.get<any[]>('http://192.168.137.1:3000/article')
      .subscribe(data => this.items.set(data));
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
    this.httpClient.post<any>('http://192.168.137.1:3000/article', { 
        name: this.articleName, 
        checked: false 
      }).subscribe(item => {
        this.items.set([...this.items(), item])
        this.articleName = null;
      });
  }

  async clearAll() {
    const alert = await this.alertCtrl.create({
      header: 'Attention !!',
      message: 'Confirmer la suppression de la liste ?',
      buttons: [
        { text: 'Annuler' },
        { text: 'Confirmer', handler: () => this.items.set([]) }
      ]
    })
    alert.present();
  }

  async showActions(item: any) {
    const as = await this.actionSheetCtrl.create({
      buttons: [
        { text: 'Cocher ou Décocher', handler: () => {
          item.checked = !item.checked;
          this.items.set([...this.items()]);
        } },
        { text: 'Supprimer', handler: () => {
          this.items.set(this.items().filter(i => i !== item));
        } }
      ]
    });
    as.present();
  }

}
