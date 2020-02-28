import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResposnseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authSercice: AuthService, private router: Router) {}

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResposnseData>;

    if (this.isLoginMode) {
      authObs = this.authSercice.login(email, password);
    } else {
      authObs = this.authSercice.signUp(email, password);
    }

    authObs.subscribe(
      responseDate => {
        console.log(responseDate);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
