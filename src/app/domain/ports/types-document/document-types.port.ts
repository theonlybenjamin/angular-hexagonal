import { DocumentTypesDTO } from "./document-types.dto";

export abstract class DocumentTypesPort {
    abstract getTypesOfDocuments() : Promise<DocumentTypesDTO[]>
}