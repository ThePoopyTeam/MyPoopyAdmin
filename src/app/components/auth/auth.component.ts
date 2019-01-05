import { LocalStorageService } from './../../core/localstorage.service';
import { AuthenticationService } from '../../core/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  firstFormGroup: FormGroup;
  hide = true;

  private endpoint = 'user/login';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private storageService: LocalStorageService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      email: ['',
        Validators.compose([
            Validators.required,
            Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/) ])],
      password: ['', Validators.compose([ Validators.required, Validators.minLength(5) ])]
    });
  }

  getErrorMessage() {
    return this.firstFormGroup.controls['email'].hasError('required') ? 'Você deve digitar seu email' :
        this.firstFormGroup.controls['email'].hasError('email') ? 'Email inválido' : '';
  }

  submit(values: User) {
    const user = {
      email: values.email,
      password: sha256(values.password).toLocaleUpperCase()
    };
    this.authentication(user);
  }


  private authentication(user: User) {
    this.auth.post(this.endpoint, user).subscribe((res: any) => {
      this.storageService.setToken(res.token);
      this.router.navigate(['/dashboard']);
    }, err => { console.error('LOGIN ERROR => ', err); });
  }
}

export interface User {
  email: string;
  password: string;
}
