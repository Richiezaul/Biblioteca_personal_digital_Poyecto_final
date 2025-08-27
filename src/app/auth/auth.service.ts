import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'app_token';
const DEMO = { email: 'admin@example.com', password: '123456', token: 'demo-token-abc-123' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(TOKEN_KEY));
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): string | null { return localStorage.getItem(TOKEN_KEY); }

  async login(email: string, password: string): Promise<void> {
    await new Promise(r => setTimeout(r, 600)); // simula API
    const ok = email.trim().toLowerCase() === DEMO.email && password === DEMO.password;
    if (!ok) throw new Error('Correo o contraseña incorrectos.');
    localStorage.setItem(TOKEN_KEY, DEMO.token);
    this._isLoggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this._isLoggedIn$.next(false);
  }
}
