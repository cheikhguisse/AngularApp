import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name?: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  setUser(user: User): void {
    this.currentUser.next(user);
  }

  clearUser(): void {
    this.currentUser.next(null);
  }
}
