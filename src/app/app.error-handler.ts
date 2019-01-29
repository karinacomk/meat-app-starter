import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/messages/notification.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zona: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      this.zona.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break
          case 403:
            this.ns.notify(message || 'Não Autorizado.')
            break
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique console para mais detalhes.')
            break
        }
      })
    }

    super.handleError(errorResponse)
  }
}
