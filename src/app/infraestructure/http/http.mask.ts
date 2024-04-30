import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpMask {
    public http: HttpClient = inject(HttpClient);
    private readonly contextDomain = 'https://capacitacion.cedhetec.com/api/';

    get<T>(url: string): Promise<T> {
        return lastValueFrom(this.http.get<T>(`${this.contextDomain}${url}`));
    }

    post<T>(url: string, body?: any): Promise<T> {
        return lastValueFrom(this.http.post<T>(`${this.contextDomain}${url}`, body));
    }

    put<T>(url: string, body?: any): Promise<T> {
        return lastValueFrom(this.http.put<T>(`${this.contextDomain}${url}`, body));
    }

    patch<T>(url: string, body?: any): Promise<T> {
        return lastValueFrom(this.http.patch<T>(`${this.contextDomain}${url}`, body));
    }

    delete<T>(url: string): Promise<T> {
        return lastValueFrom(this.http.delete<T>(`${this.contextDomain}${url}`));
    }
}