import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLogged: boolean = false;
  constructor(private authService: AuthService) { }

  Logged($event: any) {
    this.isLogged = $event
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
  }

}
