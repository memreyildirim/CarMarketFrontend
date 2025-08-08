import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthServiceService} from "../../services/auth-service.service";
import { Router} from "@angular/router";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {jwtDecode} from "jwt-decode";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardTitle,
    MatFormField,
    MatButton,
    MatInput,
    MatCard,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent implements OnInit{

  loginForm! : FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private router: Router,
              private AuthService : AuthServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', res.token);
        const decoded: any = jwtDecode(res.token);
        console.log("decoded token:",decoded);
        const role = decoded.role?.replace('ROLE','').toLowerCase();
        localStorage.setItem('user_role', role);
        console.log(decoded.role)

        if (role === 'admin') {
          this.router.navigate(['/car-list']);
        } else if (role === 'user') {
          this.router.navigate(['/car-list']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        alert('Giriş başarısız. Lütfen bilgileri kontrol edin.');
      }
    });
  }

}
