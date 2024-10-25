import { catchError, Observable, throwError } from "rxjs";
import { Candidate } from "../models/candidate";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CandidateService {
    private apiString = "/Candidates/";

    constructor(
        private http: HttpClient,
    ) { }

    getCandidates(): Observable<any> {
        return this.http.get(this.apiString.concat("GetAll/"))
            .pipe(catchError(this.handleError))
    }

    getCandidate(ID: number): Observable<any> {
        return this.http.get(this.apiString.concat('/Get?ID=').concat(ID.toString())).pipe(catchError(this.handleError))
    }

    updateCandidate(candidate: Candidate): Observable<any> {
        window.console.log(candidate);
        return this.http.put(this.apiString.concat('Update/'), candidate).pipe(catchError(this.handleError))
    }

    createCandidate(candidate: Candidate): Observable<any> {
        window.console.log(candidate);
        return this.http.post(this.apiString.concat('Create/'), candidate).pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(
            alert("error"));
    };
}