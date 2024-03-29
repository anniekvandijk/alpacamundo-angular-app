import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { MatButtonModule } from '@angular/material/button';

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
  private componentId = this.constructor.name;
  public filesSelected = false;
  private readonly destroyRef = inject(DestroyRef);
  private documentService = inject(DocumentService);
  
  public getStorageUrl(document: Document): string {
    return `${this.documentService.getStorageUrl(document)}`;
  }	

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
    if (event.target.files.length > 0) {
      this.filesSelected = true;
    } 
    else {
      this.filesSelected = false;
    }
  }
}
