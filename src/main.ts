import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

fetch('/assets/config/config.json')
  .then(response => response.json())
  .then(config => {
    (window as any).__env = config;
    return bootstrapApplication(AppComponent); // ✅ remove appConfig
  })
  .catch(err => console.error('Failed to load config:', err));
