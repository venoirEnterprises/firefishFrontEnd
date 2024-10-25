import { Routes } from '@angular/router';
import { UpsertCandidateComponent } from './components/upsert-candidate/upsert-candidate.component';
import { ListCandidatesComponent } from './components/list-candidates/list-candidates.component';

export const routes: Routes = [
    { path: 'create', component: UpsertCandidateComponent },
    { path: 'edit/:id', component: UpsertCandidateComponent },
    { path: '', component: ListCandidatesComponent }
];
