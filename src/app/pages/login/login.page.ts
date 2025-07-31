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
  LoadingController,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { LoginForm } from 'src/app/models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private loadingCtrl = inject(LoadingController);
  private readonly _router = inject(Router);

  loginForm = this._fb.group({
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

  onSubmitLogin() {
    if (this.loginForm.valid) {
      const lf: LoginForm = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      this._authService.login(lf).subscribe({
        next: () => {
          this._router.navigate(['/']);
        },
      });
    } else {
      console.log(this.loginForm.errors);
    }
  }
}
