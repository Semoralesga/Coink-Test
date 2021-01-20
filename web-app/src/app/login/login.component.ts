import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import { Session } from '../models/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogin: boolean = false;
  invalidCode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  get user() {
    return this.form.get('user');
  }

  get password() {
    return this.form.get('password');
  }

  get verificationCode() {
    return this.form.get('verificationCode');
  }

  createForm(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      verificationCode: [''],
    });
  }

  submit(): void {
    this.apiService
      .doLogin(this.user.value, this.password.value)
      .subscribe((response) => {
        console.log('>>Auth', response);
        if (response) {
          const session: Session = { user: this.user.value, token: response };
          this.storageService.setCurrentSession(session);
          this.isLogin = true;
          this.verificationCode.setValidators(Validators.required);
        }
      });
  }

  signIn(): void {
    console.log('Code', this.verificationCode.value);
    if (this.verificationCode.value === '123456') {
      this.verificationCode.setErrors({ invalidCode: false });
      this.router.navigate([`/menu`]);
    } else {
      this.verificationCode.setErrors({ invalidCode: true });
    }
  }
}
