import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertCandidateComponent } from './upsert-candidate.component';

describe('UpsertCandidateComponent', () => {
  let component: UpsertCandidateComponent;
  let fixture: ComponentFixture<UpsertCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
