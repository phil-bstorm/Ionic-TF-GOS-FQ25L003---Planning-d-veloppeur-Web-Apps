import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  LoadingController,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterForm } from 'src/app/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonInput,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
  ],
})
export class RegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private loadingCtrl = inject(LoadingController);

  registerForm = this._fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(64)],
    ],
  });

  private async showLoader() {
    const loader = await this.loadingCtrl.create({
      message: 'Inscription en cours',
    });
    loader.present();
    return loader;
  }

  async onSubmitRegister() {
    if (this.registerForm.valid) {
      const loader = await this.showLoader();

      // reconstruction de l'objet pour avoir le bon type
      const rf: RegisterForm = {
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      };
      // appel du service
      this._authService.register(rf).subscribe({
        next: () => {
          console.log('Next');
        },
        error: () => {},
        complete: () => {
          console.log('complete');
          loader.dismiss();
        },
      });
    } else {
      console.log(this.registerForm.errors);
    }
  }
}
