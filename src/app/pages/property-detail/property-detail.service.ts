import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailService {

  constructor(private http:HttpClient) { }

  getpropertybyid(id:any){
    return this.http.get(`http://localhost:5000/properties/getpropertybyid/${id}`);
  }
  addPropertyVisited(propertyId: string): Observable<any> {
    return this.http.put(`http://localhost:5000/users/addpropertyvisited/`, { propertyid: propertyId }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
  
    if (error.status === 400) {
      errorMessage = 'Bad request. Please try again later.';
    } else {
      errorMessage = 'An unexpected error occurred.';
    }
  
    // Return an observable with a user-facing error message and the status
    return throwError({
      message: errorMessage,
      status: error.status
    });
  }
}
