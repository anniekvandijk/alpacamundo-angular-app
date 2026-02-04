import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../services/form.service';
import { DocumentService } from '../services/document.service';
import { PostDocumentsRequest } from '../models/post-documents-request.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostDocumentRequest } from '../models/post-document-request.model';
import { PutDocumentRequest } from '../models/put-document-request';
import { UndeleteDocumentRequest } from '../models/undelete-document-request';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements OnInit {
  @Input() title!: string;
  @Input({ required: true }) documents: Document[] = [];
  @Input({ required: true }) documentCategory!: string;
  @Input({ required: true }) formComponentId!: string;
  @Input() multipleFiles = false;
  @Input({ required: true }) acceptedFileTypes!: string[];
  @Input() fileRequired = false;
  @Input() compactView = false;
  private destroyRef = inject(DestroyRef);
  private formService = inject(FormService);
  private documentService = inject(DocumentService);
  private addedDocuments: Document[] = [];
  private changedDocuments: [{oldDocument: Document | null, newDocument: Document | null}] = [{oldDocument: null, newDocument: null}];
  private deletedDocuments: Document[] = [];
  filePreviews: {file: File, url: string}[] = [];
  filesSelected = false;
  acceptedFileTypesString = '';

  ngOnInit(): void {
    console.log('fileloader created', this.formComponentId);
    this.formService.cancelAction$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (componentId) => {
        if (componentId === this.formComponentId)
        this.resetUpload();
      },
      complete: () => {
        this.formService.cancelActionComplete(this.formComponentId);
      }
    });
    this.acceptedFileTypesString = this.acceptedFileTypes.join(', ');
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      if (!this.multipleFiles) {
        this.filePreviews = [];
      }
      for (let i = 0; i <= fileList.length; i++) {
        const fileType = fileList[i].type;
        console.log('fileType', fileType);
        if (this.acceptedFileTypes.length > 0 && !this.acceptedFileTypes.includes(fileList[i].type.toString())) {
          alert('Dit bestandstype wordt niet ondersteund');
        } else {
          this.filePreviews.push( 
          {
            file: fileList[i],
            url: URL.createObjectURL(fileList[i])
          });
        }
      }
    } 
  }

  onPreviewFileRemove(index: number) {
    this.filePreviews.splice(index, 1);
  } 

  // Single file upload
  onDocumentUpload() {
    // replace the existing document if multiple files are not allowed
    if (!this.multipleFiles && this.documents.length > 0) {
      // UPDATE
      const putDocumentRequest: PutDocumentRequest = {
        id: this.documents[0].id,
        file: this.filePreviews[0].file,
        documentCategory: this.documentCategory
      };
      this.documentService.putDocument(putDocumentRequest, this.formComponentId).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((document) => {
        this.changedDocuments.push({ oldDocument: this.documents[0], newDocument: document });
        this.documents.splice(this.documents.indexOf(this.documents[0]), 1);
        this.documents.push(document);
        this.filePreviews = [];
      });
    } else {
      // add
      const postDocumentrequest: PostDocumentRequest = {
        file: this.filePreviews[0].file,
        documentCategory: this.documentCategory
      };
      console.log('postDocumentrequest', postDocumentrequest);
      this.documentService
        .postDocument(postDocumentrequest, this.formComponentId).pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((document) => {
          this.addedDocuments.push(document);
          this.documents.push(document);
          this.filePreviews = [];
        });
      }
  }
  
  onDocumentsUpload() {
    const postDocumentsRequest: PostDocumentsRequest = {
      files: this.filePreviews.map(fp => fp.file),
      documentCategory: this.documentCategory
    };
    this.documentService
      .postDocuments(postDocumentsRequest, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((documents) => {
        documents.forEach((document: Document) => {
            this.addedDocuments.push(document);
            this.documents.push(document);
            this.filePreviews = [];
          });
        });
  }

  onExistingDocumentRemove(documentId: string) {
    const documentToRemove = this.documents.find(d => d.id === documentId);
    if (documentToRemove) {
      this.documentService.deleteDocument(documentToRemove.id, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.deletedDocuments.push(documentToRemove);
          this.documents.splice(this.documents.indexOf(documentToRemove), 1);
        }
      });  
    }
  }

  private resetUpload() {
    this.filePreviews = [];
    // undelete all deleted files and put deleted documents back    
    this.deletedDocuments.forEach((document) => {
      const undeleteDocumentRequest: UndeleteDocumentRequest = {
        id: document.id,
        name: document.name,
        documentCategory: document.documentCategory,
        contentType: document.contentType,
        url: document.url
      };
      this.documentService.undeleteDocument(undeleteDocumentRequest, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            console.log('undelete deleted document after reset', document);
            this.documents.push(document);
          }
        });
    });
    // delete all added files and deleted added documents 
    this.addedDocuments.forEach((document) => {
      this.documentService.deleteDocument(document.id, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            console.log('delete added document after reset', document);
            }
        });
    });
    // replace all changed files with the old files
    this.changedDocuments.forEach(({oldDocument, newDocument}) => {
      if (!oldDocument || !newDocument) {
        return;
      }
      const undeleteDocumentRequest: UndeleteDocumentRequest = {
        id: oldDocument.id,
        name: oldDocument.name,
        documentCategory: oldDocument.documentCategory,
        contentType: oldDocument.contentType,
        url: oldDocument.url
      };
      this.documentService.undeleteDocument(undeleteDocumentRequest, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
          console.log('undelete changed document after reset', oldDocument);
      });
      this.documentService.deleteFile({name: newDocument.name, documentCategory: newDocument.documentCategory}, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
          console.log('delete added file after reset', newDocument);
      });
    });
  }

  getDocumentType(document: Document): string {
    return `${this.documentService.getDocumentType(document)}`;
  }
}    


