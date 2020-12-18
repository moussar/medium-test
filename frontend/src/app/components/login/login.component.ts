import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LogUser: User = new User();
  @Output() Logged = new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }

  handleLoginUser(userForm: any) {
    this.LogUser = userForm.form.value;
    this.authService.login(this.LogUser).subscribe(
      res => {
        this.Logged.emit(true);
      },
      error => console.log(error.message),
      () => {
        userForm.reset();
      }
    );
  }

}
