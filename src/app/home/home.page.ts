import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, AlertController, ActionSheetController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, trash, chatboxOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {

  // private alertCtrl = inject(AlertController)
  private asCtrl = inject(ActionSheetController)

  constructor() {
    addIcons({ checkmark, trash, chatboxOutline })
  }

  async onClick() {
    // const al = await this.alertCtrl.create({
    //   message: 'Vous avez cliquez sur le bouton'
    // });
    // al.present();

    const as = await this.asCtrl.create({
      buttons: [
        { text: 'Editer', icon: 'checkmark' },
        { text: 'Supprimer', icon: 'trash' },
      ]
    });
    as.present();
  }
}
