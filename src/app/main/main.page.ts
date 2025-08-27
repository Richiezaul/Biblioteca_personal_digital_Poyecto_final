import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); location.href = '/login'; }
}
