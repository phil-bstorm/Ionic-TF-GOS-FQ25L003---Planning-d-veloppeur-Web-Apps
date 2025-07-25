import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonIcon, IonContent, IonList, IonItem } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { Ingredient } from 'src/app/models/product';

@Component({
  selector: 'app-ingredients-modal',
  templateUrl: './ingredients-modal.component.html',
  styleUrls: ['./ingredients-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonIcon, IonContent, IonList, IonItem],
})
export class IngredientsModalComponent  implements OnInit {


  private readonly modalCtrl = inject(ModalController);

  @Input()
  ingredients!: Ingredient[];

  // la nouvelle syntaxe ne fonctionne pas avec les modales d'ionic
  // ingredients = input<Ingredient[]>();

  constructor() {
    addIcons({ arrowBack })
  }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
