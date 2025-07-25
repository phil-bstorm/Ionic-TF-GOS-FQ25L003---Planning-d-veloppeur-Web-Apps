import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { FoodService } from 'src/app/services/food.service';
import { OpenFoodFactRequest } from 'src/app/models/product';
import { addIcons } from 'ionicons';
import { add, chevronDownCircle, list, scan, skull } from 'ionicons/icons';
import { ArticleService } from 'src/app/services/article.service';
import { IngredientsModalComponent } from './components/ingredients-modal/ingredients-modal.component';
import { AllergensModalComponent } from './components/allergens-modal/allergens-modal.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonFab, IonFabButton, IonFabList]
})
export class ScannerPage {

  private readonly foodService = inject(FoodService);
  private readonly articleService = inject(ArticleService);
  private readonly modalCtrl = inject(ModalController);

  result = signal<OpenFoodFactRequest|undefined>(undefined);

  get product() {
    return this.result()?.product;
  }

  constructor() {
    // vérifie que le scanner de codebare est bien installé
    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
      .then((result) => {
        if(!result) {
          BarcodeScanner.installGoogleBarcodeScannerModule();
        }
      });
    addIcons({ scan, chevronDownCircle, add, skull, list });
  }

  async scan() {
    await BarcodeScanner.requestPermissions();
    const result = await BarcodeScanner.scan({
      formats: [BarcodeFormat.Ean13, BarcodeFormat.Ean8]
    })
    console.log(result.barcodes[0])
    this.foodService.getByCodebar(result.barcodes[0].rawValue).subscribe(response => {
      console.log(response)
      this.result.set(response);
    });
  }

  addToCart() {
    if(this.product) {
      this.articleService.addItem(this.product?.product_name)
       .subscribe()
    }
  }

  async openIngredientsModal() {
    const modal = await this.modalCtrl.create({
      component: IngredientsModalComponent,
      componentProps: { ingredients: this.result()?.product?.ingredients }
    });
    modal.present();
  }

  async openAllergensModal() {
    const modal = await this.modalCtrl.create({
      component: AllergensModalComponent,
      componentProps: { allergens: this.result()?.product?.allergens_tags }
    });
    modal.present();
  }

}
