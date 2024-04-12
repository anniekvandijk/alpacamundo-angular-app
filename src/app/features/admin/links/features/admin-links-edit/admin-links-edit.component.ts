import { Component, DestroyRef, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Link, LinkType, Image } from 'src/app/features/links/models/link.model';
import { LinkService } from 'src/app/features/links/services/link.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/features/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/features/messages/message.service';
import { PutLinkRequest } from 'src/app/features/links/models/put-link-request.model';
import { FileUploadComponent } from '../../../documents/file-upload/file-upload.component';
import { Document } from '../../../documents/models/document.model';
import { FormService } from '../../../documents/services/form.service';

@Component({
  selector: 'app-admin-links-edit',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    DeleteConfirmationDialogComponent,
    FileUploadComponent
  ],
  templateUrl: './admin-links-edit.component.html',
})
export class AdminLinksEditComponent implements OnInit{
  public componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private linkService = inject(LinkService);
  private messageService = inject(MessageService);
  private formService = inject(FormService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  public link!: Link;
  @Output() public documents!: Document[];
  public linkTypes!: LinkType[];
  public linksEditForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
    this.loadDataAndUpdateForm();
  }

  public onSubmit() {
    if (this.linksEditForm.valid) {
      const linkRequest: PutLinkRequest = {
        id: this.link.id,
        body: this.linksEditForm.value.body,
        imageId: this.link.image.id,
        linkTypeId: this.linksEditForm.value.linkType,
        title: this.linksEditForm.value.title,
        url: this.linksEditForm.value.url,
      };
      //this.putLink(linkRequest);
      console.log('Form submitted', this.linksEditForm);
    } 
    else {
      console.log('Form not submitted');
    }
  }

  public onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLink();
      } 
    });
  }

  public onNavigateBack(): void {
    this.formService.triggerCancel(this.componentId);	
    this.router.navigate(['/admin/links']);
  }

  public onReset() {
    this.formService.triggerCancel(this.componentId);	
    this.loadDataAndUpdateForm();
  }

  private createForm() {
    this.linksEditForm = new FormGroup({
      'body': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]), 
      'image': new FormControl('', [Validators.required]),
      'linkType': new FormControl('', [Validators.required]),
      'title': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      'url': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    });
  }

  private getLinkTypes(): Observable<LinkType[]> {
    return this.linkService.getLinkTypes(this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
  
  private getLink(id: string): Observable<Link> {
    return this.linkService.getLink(id, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
  
  public loadDataAndUpdateForm(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => 
        forkJoin({
          linkTypes: this.getLinkTypes(),
          link: this.getLink(params['id'])
        })
      ),
    )
    .subscribe(({ linkTypes, link }) => {
      this.linkTypes = linkTypes;
      this.link = link;
      // add all images link to the documents array
      this.documents = [link.image].map((image: Image) => {
        return {
          id: image.id,
          name: image.name,
          contentType: image.contentType,
          documentCategory: image.documentCategory,
          url: image.url
        };
      });
      this.updateForm(link);
    });
  }

  private updateForm(link: Link): void {
    this.linksEditForm.patchValue({
      'body': link.body,
      'image': link.image.id,
      'linkType': link.linkType.id,
      'title': link.title,
      'url': link.url,
    });
  }

  private putLink(linkRequest: PutLinkRequest): void {
    this.linkService.putLink(linkRequest, this.componentId)
      .subscribe(
        (link: Link) => {
          if (link) this.messageService.showSuccessMessage('editLink', 'Link gewijzigd');
        }
      );
  }

  private deleteLink(): void {
    this.linkService.deleteLink(this.link.id, this.componentId)
      .subscribe({
        next: (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('deleteLink', 'Link verwijderd');
        },
        complete: () => { 
          this.onNavigateBack();}
      });
    }
}
