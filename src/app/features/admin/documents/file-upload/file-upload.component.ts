import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() public documents: Document[] = [];
  @Input() public multipleFiles = false;
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private documentService = inject(DocumentService);

  ngOnInit(): void {
    console.log('Documents:', this.documents);
  }
  
  public getStorageUrl(document: Document): string {
    return `${this.documentService.getStorageUrl(document)}`;
  }	
}
