import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { AccountDetailService } from '../../services/account-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user = new User;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  decoded: String;
  accountID = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private accountService: AccountDetailService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    const self = this;
    localStorage.setItem('role', 'Manager');

    self.loginForm = self.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    // reset login status
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(): void {
    const self = this;
    this.submitted = true;
    let username;
    let role;
    if (this.valueIsChecked()) {
      this.loading = true;
      this.loginService.login(this.user).subscribe(
        (response: any) => {
          if (response !== '') {
            const token = response.headers.get('authorization');
            this.decoded = jwt_decode(token);
            role = this.decoded['JWTAuthoritiesKey'];
            if (role === 'Manager') {
              this.router.navigate([this.returnUrl]);
              localStorage.setItem('currentUser', JSON.stringify(token));
              username = this.decoded['sub'];
              this.accountService.getIDAccountByUsername(username).subscribe((id) => {
                this.accountID = id;
                localStorage.setItem('accountID', '' + this.accountID);
                localStorage.setItem('accountUsername', '' + username);
              },
                error => {
                  console.log(error);
                }
              );
            } else {
              this.error = 'Your account cannot access this !';
              this.loading = false;
            }
          } else {
            console.log('error when logging');
          }
        },
        error => {
          this.error = 'Username or password is incorrect !';
          this.loading = false;
        }
      );
    }
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  logOut() {
    window.localStorage.clear();
  }


  valueIsChecked(): boolean {
    if (this.loginForm.valid) {
      if (!this.loginForm.get('username').value.valid) {
        this.user.username = this.loginForm.get('username').value;
      }
      if (!this.loginForm.get('password').value.valid) {
        this.user.password = this.loginForm.get('password').value;
      }
      return true;
    } else {
      return false;
    }
  }

  // ---- Check validate when user input (Invalid)
  /* tslint:disable:max-line-length */
  isInvalid(fieldName: string) {
    return this.loginForm.get(fieldName).invalid
      && (this.loginForm.get(fieldName).dirty || this.loginForm.get(fieldName).touched) && this.loginForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.loginForm.get(fieldName).valid;
  }
}
