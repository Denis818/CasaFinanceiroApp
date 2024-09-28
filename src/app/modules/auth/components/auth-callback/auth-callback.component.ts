import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../../../core/services/storage/storage.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Você pode precisar adaptar isso se o token estiver em um cookie ou header
    this.route.fragment.subscribe((fragment: string) => {
      const token = new URLSearchParams(fragment).get('token');
      if (token) {
        console.log(token);
        this.storageService.setItem('token', token);
        // Redirecionar para a dashboard ou outra página interna
      } else {
        console.error('Token não recebido');
        // Lidar com erro de autenticação
      }
    });
  }
}
