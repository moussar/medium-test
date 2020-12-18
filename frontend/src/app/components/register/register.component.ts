import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  newUser: User = new User();

  constructor(private userService: UserService) { }

  handleRegisterUser(userForm: any) {
    this.newUser = userForm.form.value;
    this.userService.registerUser(this.newUser).subscribe(
      user => {
        console.log(user)
      },
      error => console.log(error.message),
      () => {
        userForm.reset();
      }
    );
  }
}
