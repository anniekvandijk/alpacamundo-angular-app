import { Component, DestroyRef, Input, Output, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { MatButtonModule } from '@angular/material/button';
import { NewFiles } from '../models/newFiles.model';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() set documents(documents: Document[]) {
    this.currentFiles = documents;
  }
  @Input() public callingComponentId!: string;
  @Input() public multipleFiles = false;
  @Input() public acceptedFileTypes: string[] = [];
  @Input() public fileRequired = false;
  @Input() public replaceFiles = false;
  public filesSelected = false;
  public currentFiles: Document[] = [];
  @Output() public addedFiles: NewFiles[] = [];
  @Output() public removedFiles: Document[] = [];

  isUploadrequired(): boolean {
    return this.fileRequired 
      && this.currentFiles 
      && this.currentFiles.length === 0 
      && this.addedFiles
      && this.addedFiles.length === 0;
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (event.target.files.length > 0) {
      this.filesSelected = true;
      // if onliy one file is allowed, clear the selected files array
      if (!this.multipleFiles && this.addedFiles.length > 0) {
        this.addedFiles = [];
      }
      //  else if multiple files are allowed, add the files to the selected files array
      for (let i = 0; i < fileList.length; i++) {        
      this.addedFiles.push( 
        {
          file: fileList[i],
          url: URL.createObjectURL(fileList[i])
        });
      }
    } 
    else {
      this.filesSelected = false;
    }
  }

  onPreviewFileRemove(index: number) {
    this.addedFiles.splice(index, 1);
    if (this.addedFiles.length === 0) {
      this.filesSelected = false;
    }
    // reset the file input field
    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onExistingDocumentRemove(documentId: string) {
    const documentToRemove = this.currentFiles.find(d => d.id === documentId);
    if (documentToRemove) {
      this.removedFiles.push(documentToRemove);
      const index = this.currentFiles.indexOf(documentToRemove);
      this.currentFiles.splice(index, 1);
    }
  }
}
