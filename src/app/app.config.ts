import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CandidateService } from './services/candidate.service';
import { provideHttpClient } from '@angular/common/http';
import { SkillsService } from './services/skills.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    CandidateService,
    provideHttpClient(),
    SkillsService
  ]
};
