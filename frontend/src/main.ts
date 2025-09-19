import { bootstrapApplication } from '@angular/platform-browser';
import { DiagnoseComponent } from './app/diagnose/diagnose.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(DiagnoseComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));

