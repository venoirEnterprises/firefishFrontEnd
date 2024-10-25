import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../../models/skill';
import { SkillsService } from '../../services/skills.service';
import { windowWhen } from 'rxjs';

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
    const candidateSkills = this.candidateToUpsert.skillIDs;

    if (event.target.checked) {
      candidateSkills.push(event.value);
    } else {
      let i: number = 0;
      candidateSkills.forEach(skill => {
        if (skill == event.target.value) {
          // Remove the unselected element from the arrayForm
          candidateSkills.splice(i, 1)
          return;
        }
        i++;
      });
    }

  }

  public createForm() {
    this.candidateForm = this.fb.group({
      firstName: [this.candidateToUpsert.firstName, Validators.required],
      surname: [this.candidateToUpsert.surname, Validators.required],
      dateOfBirth: [this.candidateToUpsert.dateOfBirth, Validators.required],
      address1: [this.candidateToUpsert.address1],
      town: [this.candidateToUpsert.town],
      country: [this.candidateToUpsert.country],
      phoneHome: [this.candidateToUpsert.phoneHome],
      phoneMobile: [this.candidateToUpsert.phoneMobile],
      phoneWork: [this.candidateToUpsert.phoneWork],
    });
    this.pageLoaded = true;
  }

  public Save() {
    const candidateToSend: Candidate = new Candidate();
    candidateToSend.firstName = this.candidateForm.value["firstName"];
    candidateToSend.surname = this.candidateForm.value["surname"];
    candidateToSend.dateOfBirth = this.candidateForm.value["dateOfBirth"];
    candidateToSend.town = this.candidateForm.value["town"];
    candidateToSend.country = this.candidateForm.value["country"];
    candidateToSend.phoneHome = this.candidateForm.value["phoneHome"];
    candidateToSend.phoneMobile = this.candidateForm.value["phoneMobile"];
    candidateToSend.phoneWork = this.candidateForm.value["phoneWork"];
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

  goBackToListing() {
    this.router.navigate([''])
  }
}
