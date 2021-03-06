import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../shared/messages/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                     .subscribe(user =>
                                  this.notificationService.notify(`Bem-vindo, ${user.name}`), // response de sucesso
                                response => // httpErrorResponse
                                  this.notificationService.notify(response.error.message), // callback de erro
                                () => {
                                  this.router.navigate([ atob(this.navigateTo) ])
                                }) // callback de erro

  }

}

