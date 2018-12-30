import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

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
  step2Done = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['',
        Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.compose([ Validators.required, Validators.minLength(5) ])]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getErrorMessage() {
    return this.firstFormGroup.controls['email'].hasError('required') ? 'You must enter a value' :
        this.firstFormGroup.controls['email'].hasError('email') ? 'Not a valid email' :
            '';
  }

  submit(values) {
    console.log('SUBMITTED => ', values);
  }

}
