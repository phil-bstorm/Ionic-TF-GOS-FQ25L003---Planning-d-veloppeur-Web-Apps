import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CompletionService } from 'src/app/services/completion.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class CameraPage implements OnInit {

  private readonly completionService = inject(CompletionService);
  private readonly loadingCtrl = inject(LoadingController); 

  constructor() { }

  ngOnInit() {
  }

  async takePicture() {
    await Camera.requestPermissions();
    const result = await Camera.getPhoto({ 
      resultType: CameraResultType.Base64 
    })
    if(result.base64String) {
      const loader = await this.loadingCtrl.create({ 
        message: 'Traitement en cours'
      });
      loader.present();
      this.completionService.getDenomination(result.base64String).pipe(
        tap(console.log),
        switchMap((result: any) => this.completionService.getEan(JSON.parse(result.choices[0].message.content).denomination))
      ).subscribe((result: any) => {
        loader.dismiss();
        console.log(console.log(JSON.parse(result.choices[0].message.content)))
      })
    }
  }

}
