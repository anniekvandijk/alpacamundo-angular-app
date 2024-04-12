import { Component, DestroyRef, Input, OnInit, Output, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../services/form.service';
import { DocumentService } from '../services/document.service';
import { PostDocumentsRequest } from '../models/post-documents-request.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostDocumentRequest } from '../models/post-document-request.model';

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

  /** 
   * In case the user can only upload one file, the existing file will be replaced
   */
  private readonly replaceFile = (
    !this.multipleFiles && this.documents.length > 0 && this.addedDocuments.length > 0) ? true : false;

  ngOnInit(): void {
    this.formService.cancelAction$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((componentId) => {
      if (componentId === this.formComponentId) {
          this.resetUpload();
      }
    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      if (!this.multipleFiles) {
        this.filePreviews = [];
      }
      for (let i = 0; i < fileList.length; i++) {        
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
    if (this.replaceFile) {
      this.documentService.deleteDocument(this.documents[0].id, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.deletedDocuments.push(this.documents[0]);
          this.documents.splice(this.documents.indexOf(this.documents[0]), 1);
        }
      });
    }
    const postDocumentrequest: PostDocumentRequest = {
      file: this.filePreviews[0].file,
      documentCategory: 'link'
    };
    this.documentService
      .postDocument(postDocumentrequest, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((document) => {
        if (this.replaceFile) {
          this.deletedDocuments.push(this.addedDocuments[0]);
          this.documents.splice(this.documents.indexOf(this.addedDocuments[0]), 1);
        }
        this.addedDocuments = [document];
        this.documents.push(document);
      });

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
      this.documentService.undeleteDocument(document, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            this.deletedDocuments.splice(this.deletedDocuments.indexOf(document), 1);
            this.documents.push(document);
          }
        });
    });
    // remove documents that were added
    this.addedDocuments.forEach((document) => {
      this.documentService.deleteDocument(document.id, this.formComponentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result) {
            this.addedDocuments.splice(this.addedDocuments.indexOf(document), 1);
            this.documents.splice(this.documents.indexOf(document), 1);
          }
        });
    });
  }
}
