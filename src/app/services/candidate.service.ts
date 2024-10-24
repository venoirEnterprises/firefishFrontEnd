import { catchError, Observable, throwError } from "rxjs";
import { Candidate } from "../models/candidate";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CandidateService {
    private candidates: Candidate[] = [];
    private apiString = "/Candidates/";

    constructor(
        private http: HttpClient,
    ) { }

    getCandidates(): Observable<any> {
        return this.http.get(this.apiString.concat("GetAll/"))
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(
            alert("error getting candidates"));
    };
}