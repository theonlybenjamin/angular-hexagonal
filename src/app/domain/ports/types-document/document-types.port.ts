import { Observable } from "../../mask/observable.mask";
import { DocumentTypesDTO } from "./document-types.dto";

export abstract class DocumentTypesPort {
    abstract getTypesOfDocuments() : Observable<DocumentTypesDTO[]>
}