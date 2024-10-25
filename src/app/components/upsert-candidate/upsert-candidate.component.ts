import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upsert-candidate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upsert-candidate.component.html',
  styleUrl: './upsert-candidate.component.sass'
})
export class UpsertCandidateComponent implements OnInit {

  candidateForm: FormGroup;
  candidateToUpsert: Candidate = new Candidate();

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateForm = this.fb.group({
      firstName: [this.candidateToUpsert.firstName, Validators.required],
      surname: [this.candidateToUpsert.surname, Validators.required],
      dateOfBirth: [this.candidateToUpsert.dateOfBirth, Validators.required],
      address1: [this.candidateToUpsert.address1],
      town: [this.candidateToUpsert.town],
      country: [this.candidateToUpsert.country],
      phoneHome: [this.candidateToUpsert.phoneHome],
      phoneMobile: [this.candidateToUpsert.phoneMobile],
      phnneWork: [this.candidateToUpsert.phnneWork]
    });
  }

  public Save() {
    const candidateToUpsert: Candidate = new Candidate();
    candidateToUpsert.firstName = this.candidateForm.value["firstName"];
    candidateToUpsert.surname = this.candidateForm.value["surname"];
    candidateToUpsert.dateOfBirth = this.candidateForm.value["dateOfBirth"];
    candidateToUpsert.town = this.candidateForm.value["town"];
    candidateToUpsert.country = this.candidateForm.value["country"];
    candidateToUpsert.phoneHome = this.candidateForm.value["phoneHome"];
    candidateToUpsert.phoneMobile = this.candidateForm.value["phoneMobile"];
    candidateToUpsert.phnneWork = this.candidateForm.value["phnneWork"];
    this.candidateService.createCandidate(candidateToUpsert).subscribe(upsertResult => {
      if (upsertResult) {
        this.router.navigate(['/']);
      } else {
        console.log("error, see previous")
      }
    })
  }
}
