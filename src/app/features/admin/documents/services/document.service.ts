import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpService } from "src/app/shared/services/http-service";
import { environment } from "src/environments/environment";
import { Document } from "../models/document.model";
import { PostDocumentRequest } from "../models/post-document-request.model";
import { PostDocumentsRequest } from "../models/post-documents-request.model";
import { UndeleteFileRequest } from "../models/undelete-file-request";
import { PutDocumentRequest } from "../models/put-document-request";
import { HttpResponse } from "@angular/common/http";
import { DeleteFileRequest } from "../models/delete-file-request";
import { UndeleteDocumentRequest } from "../models/undelete-document-request";

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/documents`;

  getDocumentType(document: Document): string {

    switch (document.contentType) {
      case 'image/svg+xml':
      case 'image/png':
      case 'image/jpeg':
        return 'img';
      case 'application/pdf':
        return 'pdf';
      case 'general': 
        return 'unknown';
      default:
        return 'unknown';
    }
  }

  getDocuments(componentId: string): Observable<Document[]> {
    return this.httpService.get<Document[]>(this.url, componentId);
  }

  getDocument(id: string, componentId: string): Observable<Document> {
    return this.httpService.get<Document>(this.url.concat('/', id), componentId);
  }

  postDocument(document: PostDocumentRequest, componentId: string): Observable<Document> {
    const formData = new FormData();
    formData.append('FormFile', document.file);
    const queryUrl = this.url.concat('?FileCategory=', document.documentCategory);
    return this.httpService.post<Document>(queryUrl, document, componentId);
  }

  postDocuments(documents: PostDocumentsRequest, componentId: string): Observable<Document[]> {
    const formData = new FormData();
    documents.files.forEach(file => {
      formData.append('FormFile', file);
    });
    const queryUrl = this.url.concat('?FileCategory=', documents.documentCategory);
    return this.httpService.post<Document[]>(queryUrl, formData, componentId);
  }

  putDocument(document: PutDocumentRequest, componentId: string): Observable<Document> {
    const formData = new FormData();
    formData.append('FormFile', document.file);
    const queryUrl = this.url.concat('?Id=', document.id, '&FileCategory=', document.documentCategory);
    return this.httpService.put<Document>(queryUrl, formData, componentId);
  }

  deleteDocument(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/', id), componentId);
  }

  undeleteDocument(document: UndeleteDocumentRequest, componentId: string): Observable<Document> {
    return this.httpService.put<Document>(this.url.concat('/undelete'), document, componentId);
  }

  undeleteFile(undeleteFileRequest: UndeleteFileRequest, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url.concat('/undeletefile'), undeleteFileRequest, componentId).pipe(
      map((response) => {
        if (response) return true;
        else return false;
      }
    ));
  }
  

  deleteFile(deleteFileRequest: DeleteFileRequest, componentId: string): Observable<boolean> {
    return this.httpService.post<Document>(this.url.concat('/deletefile'), deleteFileRequest, componentId).pipe(
      map((response) => {
        if (response) return true;
        else return false;
      }
    ));
  }
}
