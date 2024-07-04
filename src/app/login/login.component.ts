import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {ApiService} from "../Service/api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  errorMessage: any;
  loading = false;

  constructor(private fb:FormBuilder,private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]]
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.loading = true;
    this.errorMessage = null;
    this.apiService.Login(username, password)
      .then((token: any) => {
        console.log(token);
        this.router.navigateByUrl(`/verification/${token.mail}`)
      })
      .catch(err => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Mot de passe incorrecte';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }


}
