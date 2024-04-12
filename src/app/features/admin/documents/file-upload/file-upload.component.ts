import { Component, DestroyRef, Input, OnInit, Output, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../services/form.service';
import { DocumentService } from '../services/document.service';
import { PostDocumentsRequest } from '../models/post-documents-request.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostDocumentRequest } from '../models/post-document-request.model';
import { PutDocumentRequest } from '../models/put-document-request';
import { UndeleteDocumentRequest } from '../models/undelete-document-request';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent implements OnInit {
  @Input() documents: Document[] = [];
  @Input() formComponentId!: string;
  @Input() multipleFiles = false;
  @Input() acceptedFileTypes: string[] = [];
  @Input() fileRequired = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly formService = inject(FormService);
  private readonly documentService = inject(DocumentService);
  private addedDocuments: Document[] = [];
  private deletedDocuments: Document[] = [];
  filePreviews: {file: File, url: string}[] = [];
  filesSelected = false;

  ngOnInit(): void {
    this.formService.cancelAction$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((componentId) => {
      if (componentId === this.formComponentId) {
        // TODO: implement cancel action
        // the documents added and deleted are gone as soon as you leave the component
        // What do I do? 
        // put added and deleted documents in the formService and then remove them when the form is submitted?
        //  this.resetUpload();
      }
    });
  }

  log() {
    console.log('documents', this.documents);
    console.log('addedDocuments', this.addedDocuments);
    console.log('deletedDocuments', this.deletedDocuments);
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      if (!this.multipleFiles) {
        this.filePreviews = [];
      }
      for (let i = 0; i <= fileList.length; i++) {        
      this.filePreviews.push( 
        {
          file: fileList[i],
          url: URL.createObjectURL(fileList[i])
        });
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
        documentCategory: 'link'
      };
      this.documentService.putDocument(putDocumentRequest, this.formComponentId).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((document) => {
        this.deletedDocuments.push(this.documents[0]);
        this.documents.splice(this.documents.indexOf(this.documents[0]), 1);
        this.addedDocuments.push(document);
        this.documents.push(document);
        this.filePreviews = [];
      });
    } else {
      // add
      const postDocumentrequest: PostDocumentRequest = {
        file: this.filePreviews[0].file,
        documentCategory: 'link'
      };
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
      documentCategory: 'link'
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
    // undelete documents that were deleted
    this.deletedDocuments.forEach((document) => {
      const undeleteDocumentRequest: UndeleteDocumentRequest = {
        id: document.id,
        name: document.name,
        contentType: document.contentType,
        documentCategory: document.documentCategory,
        url: document.url
      };
      this.documentService.undeleteDocument(undeleteDocumentRequest, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            this.deletedDocuments.splice(this.deletedDocuments.indexOf(document), 1);
            this.documents.push(document);
          }
        });
    });
    this.addedDocuments.forEach((document) => {
      this.documentService.deleteDocument(document.id, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            this.addedDocuments.splice(this.addedDocuments.indexOf(document), 1);
            if (this.multipleFiles) {
              // only remove the document from the documents if multiple files are allowed
              // else this document is already the resetted document
              this.documents.splice(this.documents.indexOf(document), 1);
            }
          }
        });
    });
  }
}
