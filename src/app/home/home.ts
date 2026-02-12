import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  user: User | null = null;
  loginTime: Date = new Date();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loginTime = new Date(); // Enregistrer l'heure de connexion
      }
    });
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  getLoginTime(): string {
    const now = new Date();
    const diff = now.getTime() - this.loginTime.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "quelques secondes";
    if (minutes === 1) return "1 minute";
    if (minutes < 60) return `${minutes} minutes`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 heure";
    if (hours < 24) return `${hours} heures`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "1 jour";
    return `${days} jours`;
  }
}
