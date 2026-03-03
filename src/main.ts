import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';



bootstrapApplication(App, {
  providers: [
    MessageService,
    ConfirmationService,
     provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Lara,
          options: {
          primaryColor: '#6f42c1',
          darkModeSelector: '.dark-mode',
          cssLayer:false,
        }
        //  ripple: true
      },
      
    })
  ]
});


