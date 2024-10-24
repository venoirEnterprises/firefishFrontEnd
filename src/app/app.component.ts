import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Candidate } from './models/candidate';
import { CandidateService } from './services/candidate.service';
import { CommonModule } from '@angular/common';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = "firefishFrontEnd";
  candidates: Candidate[] = [];
  pageLaded = false;

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(candidates => {
      window.console.log(candidates[0]);
      this.candidates = candidates;
      this.pageLaded = true;
    })
  }
}
