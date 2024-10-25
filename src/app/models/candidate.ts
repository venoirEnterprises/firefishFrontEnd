export class Candidate {
    public id: number;
    public firstName: string;
    public surname: string;
    public dateOfBirth: string;
    public address1: string;
    public town: string;
    public country: string;
    public phoneHome: string;
    public phoneMobile: string;
    public phoneWork: string;
    public skillIDs: number[];
}

export class CandidateListingItem extends Candidate {
    public skillNamesConcatanated: string;
}