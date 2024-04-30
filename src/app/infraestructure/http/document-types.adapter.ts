import { Injectable, inject } from "@angular/core";
import { Endpoints } from "../../domain/enum/endpoints.enum";
import { Observable } from "../../domain/mask/observable.mask";
import { DocumentTypesDTO } from "../../domain/ports/types-document/document-types.dto";
import { DocumentTypesPort } from "../../domain/ports/types-document/document-types.port";
import { HttpMask } from "./http.mask";

@Injectable({
    providedIn: 'root'
})
export class DocumentTypesAdapter implements DocumentTypesPort {
    private readonly http: HttpMask = inject(HttpMask);
    getTypesOfDocuments(): Observable<DocumentTypesDTO[]> {
        return this.http.get(Endpoints.DOCUMENT_TYPES)
    }
}