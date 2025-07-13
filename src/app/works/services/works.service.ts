import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Work } from '../interfaces/work.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class WorksService {
    private baseUrl: string = environments.baseurl;

    constructor(private http: HttpClient) { }

    getWorks():Observable<Work[]>{
      return this.http.get<Work[]>(`${this.baseUrl}/works`);
    }

    getWorksById(id: string):Observable<Work|undefined>{
    return this.http.get<Work>(`${this.baseUrl}/works/${id}`)
                    .pipe(
                      catchError(error => of(undefined))
                    );
  }

    createWorks(work: Work):Observable<Work>{
      return this.http.post<Work>(`${this.baseUrl}/works/new`, work);
    }

    updateWorks(work: Work):Observable<Work>{
      if(!work._id) throw Error('Tarea id is required');
      return this.http.put<Work>(`${this.baseUrl}/works/${work._id}`, work);
    }

    deleteWorkById(id: string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/works/${id}`)
      .pipe(
        catchError( error => of(false)),
        map( resp => true)
      )
  }
}
