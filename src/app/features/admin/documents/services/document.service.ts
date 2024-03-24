import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpService } from "src/app/shared/services/http-service";
import { environment } from "src/environments/environment";
import { Document } from "../models/document.model";
import { PostDocumentRequest } from "../models/post-document-request.model";
import { PostDocumentsRequest } from "../models/post-documents-request.model";

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  private httpService = inject(HttpService);
  private url = `${environment.apiBaseUrl}/api/documents`;

  public getStorageUrl(document: Document): string {

    switch (document.documentCategory.toLocaleLowerCase()) {
      case 'alpacafleeceresult':
        return environment.storageUrls.alpacaFleeceResultsUrl;
      case 'alpacaimage':
        return environment.storageUrls.alpacaImagesUrl;
      case 'alpacapedigree':
        return environment.storageUrls.alpacaPedigreeUrl;
      case 'alpacashowresults':
        return environment.storageUrls.showResultsUrl;
        case 'infopage':
          return environment.storageUrls.infopageImagesUrl;
      case 'link':
        return environment.storageUrls.linkImagesUrl;
      case 'staticpage':
        return environment.storageUrls.staticPageImagesUrl;
      case 'general': 
        return environment.storageUrls.generalUrl;
      default:
        return environment.storageUrls.generalUrl;  
    }
  }

  public getDocumentType(document: Document): string {

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

  public getDocuments(componentId: string): Observable<Document[]> {
    return this.httpService.get<Document[]>(this.url, componentId);
  }

  public getDocument(id: string, componentId: string): Observable<Document> {
    return this.httpService.get<Document>(this.url.concat('/', id), componentId);
  }

  public postDocument(document: PostDocumentRequest, componentId: string): Observable<boolean> {
    return this.httpService.post<PostDocumentRequest>(this.url, document, componentId);
  }

  public postDocuments(documents: PostDocumentsRequest, componentId: string): Observable<boolean> {
    return this.httpService.post<PostDocumentsRequest>(this.url, documents, componentId);
  }

  public deleteDocument(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/', id), componentId);
  }
}
