import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutingModule } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/Interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutingModule),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr(),
  ],
};
