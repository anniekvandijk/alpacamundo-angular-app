import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { MatButtonModule } from '@angular/material/button';
import { on } from 'events';
import { selectedFile } from '../models/selectedFile.model';
import { forEach } from 'cypress/types/lodash';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() public documents: Document[] = [];
  @Input() public multipleFiles = false;
  @Input() public acceptedFileTypes: string[] = [];
  @Input() public fileRequired = false;
  @Input() public replaceFiles = false;
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private documentService = inject(DocumentService);
  public filesSelected = false;
  public selectedFiles: selectedFile[] = [];

  ngOnInit(): void {
    console.log('FileUploadComponent initialized');
    console.log('Documents', this.documents);
    console.log('Multiple files', this.multipleFiles);
    console.log('Accepted file types', this.acceptedFileTypes);
    console.log('File required', this.fileRequired);
    console.log('Files selected', this.filesSelected);
  }

  onFileChange(event: any) {
    console.log('File changed', event);
    const fileList: FileList = event.target.files;
    if (event.target.files.length > 0) {
      this.filesSelected = true;
      // if onliy one file is allowed, clear the selected files array
      if (!this.multipleFiles && this.selectedFiles.length > 0) {
        this.selectedFiles = [];
      }
      //  else if multiple files are allowed, add the files to the selected files array
      for (let i = 0; i < fileList.length; i++) {        
      this.selectedFiles.push( 
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
    console.log('File removed', index);
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length === 0) {
      this.filesSelected = false;
    }
  }

  public onFileUpload() {
    console.log('Files uploaded');
  }
}
