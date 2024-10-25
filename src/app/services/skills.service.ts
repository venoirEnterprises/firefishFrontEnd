import { catchError, Observable, throwError } from "rxjs";
import { Candidate } from "../models/candidate";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SkillsService {
    private apiString = "/Skills/";

    constructor(
        private http: HttpClient,
    ) { }

    getSkills(): Observable<any> {
        return this.http.get(this.apiString.concat("GetAll/"))
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(
            alert("error"));
    };
}