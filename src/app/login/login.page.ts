import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;
  hide = true;
  loading = false;

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  toggleHide() { this.hide = !this.hide; }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const loading = await this.loadingCtrl.create({ message: 'Validando...' });
    await loading.present();

    const { email, password } = this.form.value;
    try {
      await this.auth.login(email, password);
      await loading.dismiss();
      (await this.toastCtrl.create({ message: '¡Bienvenido!', duration: 1400, color: 'success' })).present();
      this.router.navigateByUrl('/main', { replaceUrl: true });
    } catch (e: any) {
      await loading.dismiss();
      (await this.toastCtrl.create({ message: e?.message ?? 'Error de inicio de sesión', duration: 2000, color: 'danger' })).present();
    } finally {
      this.loading = false;
    }
  }

  loginDemo() {
    this.form.setValue({ email: 'admin@example.com', password: '123456' });
  }
}
