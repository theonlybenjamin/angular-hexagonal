import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "../../domain/mask/observable.mask";

@Injectable({
    providedIn: 'root'
})
export class HttpMask {
    public http: HttpClient = inject(HttpClient);
    private readonly contextDomain = 'https://capacitacion.cedhetec.com/api/';

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(`${this.contextDomain}${url}`);
    }

    post<T>(url: string, body?: any): Observable<T> {
        return this.http.post<T>(`${this.contextDomain}${url}`, body);
    }

    put<T>(url: string, body?: any): Observable<T> {
        return this.http.put<T>(`${this.contextDomain}${url}`, body);
    }

    patch<T>(url: string, body?: any): Observable<T> {
        return this.http.patch<T>(`${this.contextDomain}${url}`, body);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${this.contextDomain}${url}`);
    }
}