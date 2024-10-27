import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../../models/skill';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-upsert-candidate',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upsert-candidate.component.html',
  styleUrl: './upsert-candidate.component.sass'
})
export class UpsertCandidateComponent implements OnInit {

  candidateForm: FormGroup;
  candidateID: any = null;
  candidateToUpsert: Candidate = new Candidate();
  pageLoaded = false;
  isEditing = false;
  skills: Skill[] = [];

  constructor(
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private skillsService: SkillsService
  ) { }

  ngOnInit() {
    this.candidateID = this.activatedRoute.snapshot.paramMap.get("id");
    this.candidateToUpsert.skillIDs = [];
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
      if (this.candidateID != null) {
        this.candidateService.getCandidate(this.candidateID).subscribe(candidate => {
          this.candidateToUpsert = candidate;
          this.isEditing = true;
          this.createForm();
        })
      } else {
        this.createForm();
      }
    })
  }

  public candidateHasSkill(ID: number): boolean {
    return this.candidateToUpsert.skillIDs.filter(skill => skill == ID).length > 0
  }

  public updateCandidateSkills(event: any) {
    let candidateSkills = this.candidateToUpsert.skillIDs;

    if (event.target.checked) {
      candidateSkills.push(event.target.value as number);
    } else {
      let i: number = 0;
      candidateSkills.forEach(skill => {
        if (skill == event.target.value) {
          candidateSkills.splice(i, 1)
          return;
        }
        i++;
      });
    }
    this.candidateToUpsert.skillIDs = candidateSkills;
  }

  public createForm() {
    this.candidateForm = this.fb.group({
      firstName: [this.candidateToUpsert.firstName, Validators.required],
      surname: [this.candidateToUpsert.surname, Validators.required],
      dateOfBirth: [this.candidateToUpsert.dateOfBirth, Validators.required],
      address1: [this.candidateToUpsert.address1, Validators.required],
      town: [this.candidateToUpsert.town, Validators.required],
      country: [this.candidateToUpsert.country, Validators.required],
      postCode: [this.candidateToUpsert.postCode, Validators.required],
      phoneHome: [this.candidateToUpsert.phoneHome, Validators.required],
      phoneMobile: [this.candidateToUpsert.phoneMobile, Validators.required],
      phoneWork: [this.candidateToUpsert.phoneWork, Validators.required]
    });
    this.pageLoaded = true;
  }

  public updateNameValidation() {
    this.candidateForm.controls['firstName'].updateValueAndValidity();
  }

  public updateSurnameValidation() {
    this.candidateForm.controls['surname'].updateValueAndValidity();
  }

  public updateDOBValidation() {
    this.candidateForm.controls['dateOfBirth'].updateValueAndValidity();
  }

  public updateAddress1Validation() {
    this.candidateForm.controls['address1'].updateValueAndValidity();
  }

  public updateTownValidation() {
    this.candidateForm.controls['town'].updateValueAndValidity();
  }

  public updateCountryValidation() {
    this.candidateForm.controls['country'].updateValueAndValidity();
  }

  public updatePostCodeValidation() {
    this.candidateForm.controls['postCode'].updateValueAndValidity();
  }

  public updatePhoneHomeValidation() {
    this.candidateForm.controls['phoneHome'].updateValueAndValidity();
  }

  public updatePhoneMobileValidation() {
    this.candidateForm.controls['phoneMobile'].updateValueAndValidity();
  }

  public updatePhoneWorkValidation() {
    this.candidateForm.controls['phoneWork'].updateValueAndValidity();
  }

  public Save() {
    const candidateFrm = this.candidateForm;

    if (candidateFrm.invalid) {
      return;
    } else {
      const candidateToSend: Candidate = new Candidate();
      candidateToSend.firstName = candidateFrm.value["firstName"];
      candidateToSend.surname = candidateFrm.value["surname"];
      candidateToSend.dateOfBirth = candidateFrm.value["dateOfBirth"];
      candidateToSend.address1 = candidateFrm.value["address1"];
      candidateToSend.town = candidateFrm.value["town"];
      candidateToSend.country = candidateFrm.value["country"];
      candidateToSend.postCode = candidateFrm.value["postCode"]
      candidateToSend.phoneHome = candidateFrm.value["phoneHome"];
      candidateToSend.phoneMobile = candidateFrm.value["phoneMobile"];
      candidateToSend.phoneWork = candidateFrm.value["phoneWork"];
      candidateToSend.skillIDs = this.candidateToUpsert.skillIDs;

      if (this.isEditing) {
        candidateToSend.id = this.candidateID;
        this.candidateService.updateCandidate(candidateToSend).subscribe(updateResult => {
          if (updateResult) {
            this.goBackToListing();
          } else {
            console.log("error, see previous")
          }
        })
      } else {
        this.candidateService.createCandidate(candidateToSend).subscribe(createResult => {
          if (createResult) {
            this.goBackToListing();
          } else {
            console.log("error, see previous")
          }
        })
      }
    }
  }

  goBackToListing() {
    this.router.navigate([''])
  }
}
