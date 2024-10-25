import { Component } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CandidateListingItem } from '../../models/candidate';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-candidates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-candidates.component.html',
  styleUrl: './list-candidates.component.sass'
})
export class ListCandidatesComponent {
  candidateListingItems: CandidateListingItem[] = [];
  pageLaded = false;

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(candidates => {
      this.candidateListingItems = candidates;
      this.pageLaded = true;
    })
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

}
