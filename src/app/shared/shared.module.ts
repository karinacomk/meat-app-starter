import { AuthInterceptor } from './../security/auth.interceptor';
import { LeaveOrderGuard } from './../order/leave-order.guard';
import { LoginService } from './../security/login/login.service';
import { NotificationService } from './messages/notification.service';
import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http'

@NgModule ({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent,
            CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent]
})

export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ShoppingCartService,
                  RestaurantsService,
                  OrderService,
                  NotificationService,
                  LoginService,
                  LoggedInGuard,
                  LeaveOrderGuard,
                  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
    }

  }
}
