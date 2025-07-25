import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class CameraPage implements OnInit {


  imageUrl = signal<string>('');

  constructor() { }

  ngOnInit() {
  }

  async takePicture() {
    await Camera.requestPermissions();
    const result = await Camera.getPhoto({ 
      resultType: CameraResultType.Base64 
    })
    this.imageUrl.set('data:image/jpeg;base64,' + result.base64String);
  }

}
