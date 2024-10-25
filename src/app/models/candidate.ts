export class Candidate {
    public firstName: string;
    public surname: string;
    public dateOfBirth: string;
    public address1: string;
    public town: string;
    public country: string;
    public phoneHome: string;
    public phoneMobile: string;
    public phnneWork: string;
}

export class CandidateListingItem extends Candidate {
    public skills: string;
}