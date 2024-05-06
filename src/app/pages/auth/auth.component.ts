import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IError } from 'src/app/interfaces/i-error';
import {
  ISignUp,
  ISignUpReturn,
  ISignin,
  IToken,
} from 'src/app/interfaces/i-signin';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnDestroy, OnInit {
  user: ISignin;
  error: IError;
  userSignUp: ISignUp;
  selectedOption: string;
  form!: FormGroup;
  username: string;
  passwords: string;
  randomString: string;
  showToastFlag: boolean = false;


  private userService = inject(UserService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  // private elementRef = inject(ElementRef);

  ngOnInit(): void {
    // document.body.style.backgroundColor =
    //   '#6ED0F6';
    // document.body.style.color = '#fff';
    // document.body.style.fontFamily =
    //   "'Raleway', sans-serif";

    document.body.classList.add('login-body');
  }

  ngOnDestroy(): void {
    console.log('destroy');
    // document.body.style.removeProperty('backgroundColor');
    // document.body.style.removeProperty('color');
    // document.body.style.removeProperty('fontFamily');
    document.body.classList.remove('login-body');
  }

  constructor(
    private elementRef: ElementRef,
    private toastService: ToastService
  ) {
    this.randomString = this.generateRandomString(6);
    this.username = '';
    this.passwords = '';
    this.user = {
      username: '',
      password: '',
    };
    this.error = {
      detail: '',
    };
    this.selectedOption = 'signin';
    this.userSignUp = {
      username: '',
      email: '',
      password: '',
      personalDataID: {
        firstName: '',
        lastName: '',
      },
      dealerCode: '',
    };
  }

  // ngAfterViewInit() {

  // }

  generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // updateBoth() {
  //   this.user.username = this.username;
  //   this.userSignUp.username = this.username;
  // }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 9) {
      if (this.selectedOption == 'signin') {
        event.preventDefault();
      }
    }
  }

  doAuth() {
    this.user.username = this.username;
    this.userSignUp.username = this.username;
    this.user.password = this.passwords;
    this.userSignUp.password = this.passwords;
    console.log(this.selectedOption);
    if (this.selectedOption == 'signin') {
      this.userService
        .signIn(this.user)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.error.detail = error.error.detail;
            Swal.fire({
              title: 'Error!',
              text: error.error.detail,
              icon: 'error',
              confirmButtonText: 'Ah',
            });
            return throwError(() => new Error('Something went wrong'));
          })
        )
        .subscribe((response: IToken) => {
          console.log(response.data.token);
          this.userService.setAuthentication(response);
          this.router.navigate(['/main/consumer']);
        });
    } else if (this.selectedOption == 'signup') {
      this.userSignUp.username = this.randomString;
      this.userSignUp.email = this.username;
      console.log(this.userSignUp);
      
      this.userService
        .signUp(this.userSignUp)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.error.detail = error.error.detail;
            Swal.fire({
              title: 'Error!',
              text: error.error.detail,
              icon: 'error',
              confirmButtonText: 'Ah',
            });
            return throwError(() => new Error('Something went wrong'));
          })
        )
        .subscribe((response: ISignUpReturn) => {
          this.showToastFlag = true;
          this.selectedOption = 'signin';
        });
    }
  }
}
