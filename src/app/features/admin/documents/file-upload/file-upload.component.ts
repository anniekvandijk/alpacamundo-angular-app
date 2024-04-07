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
  @Input() set documents(documents: Document[]) {
    this.currentDocuments = documents;
  }
  @Input() public formComponentId!: string;
  @Input() public multipleFiles = false;
  @Input() public acceptedFileTypes: string[] = [];
  @Input() public fileRequired = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly formService = inject(FormService);
  private readonly documentService = inject(DocumentService);
  public currentDocuments: Document[] = [];
  private addedDocuments: Document[] = [];
  private deletedDocuments: Document[] = [];
  public filePreviews: {file: File, url: string}[] = [];

  public filesSelected = false;

  
  private readonly replaceFile = (
    !this.multipleFiles && this.addedDocuments.length > 0) ? true : false;

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


  onUploadSubmit() {
    if (this.multipleFiles) {
      this.onDocumentsUpload();
    } else {
      this.onDocumentUpload();
    }
  }

  // Single file upload
  onDocumentUpload() {
    // TODO delete existing document
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
          this.currentDocuments.splice(this.currentDocuments.indexOf(this.addedDocuments[0]), 1);
        }
        this.addedDocuments = [document];
        this.currentDocuments.push(document);
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
            this.currentDocuments.push(document);
          });
        });
  }

  onExistingDocumentRemove(documentId: string) {
    const documentToRemove = this.currentDocuments.find(d => d.id === documentId);
    if (documentToRemove) {
      this.documentService.deleteDocument(documentToRemove.id, this.formComponentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.deletedDocuments.push(documentToRemove);
          this.currentDocuments.splice(this.currentDocuments.indexOf(documentToRemove), 1);
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
            this.currentDocuments.push(document);
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
            this.currentDocuments.splice(this.currentDocuments.indexOf(document), 1);
          }
        });
    });
  }
}
