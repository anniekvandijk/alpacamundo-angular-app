import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpServiceResponse } from "src/app/shared/models/http-service-response.model";
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

    switch (document.fileCategory.toLocaleLowerCase()) {
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

    // TODO: Refactor this to use backend instead of frontend
    switch (document.fileCategory.toLocaleLowerCase()) {
      case 'alpacafleeceresult':
        return 'pdf';
      case 'alpacaimage':
        return 'img';
      case 'alpacapedigree':
        return 'pdf';
      case 'alpacashowresults':
        return 'pdf';
      case 'infopage':
        return 'img';
      case 'link':
        return 'img';
      case 'staticpage':
        return 'img';
      case 'general': 
        return 'unknown';
      default:
        return 'unknown';
    }
  }

  public getDocuments(componentId: string): Observable<Document[]> {
    return this.httpService.get(this.url, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as Document[] }
      )
    )
  }

  public getDocument(id: string, componentId: string): Observable<Document> {
    return this.httpService.get(this.url.concat('/', id), componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.body as Document }
      )
    )
  }

  public postDocument(document: PostDocumentRequest, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url, document, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public postDocuments(documents: PostDocumentsRequest, componentId: string): Observable<boolean> {
    return this.httpService.post(this.url, documents, componentId)
    .pipe(
      map(
        (response: HttpServiceResponse) => { return response.ok }
      )
    )
  }

  public deleteDocument(id: string, componentId: string): Observable<boolean> {
    return this.httpService.delete(this.url.concat('/', id), componentId)
      .pipe(
        map(
          (response: HttpServiceResponse) => { return response.ok }
        )
      )
  }
}
