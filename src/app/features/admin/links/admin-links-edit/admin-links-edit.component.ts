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
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/components/messages/message.service';
import { PutLinkRequest } from 'src/app/features/links/models/put-link-request.model';
import { FileUploadComponent } from '../../documents/file-upload/file-upload.component';
import { Document } from '../../documents/models/document.model';
import { FormService } from '../../documents/services/form.service';
import { PostLinkRequest } from 'src/app/features/links/models/post-link-request.model';

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
  @Output() documents!: Document[];
  readonly componentId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private linkService = inject(LinkService);
  private messageService = inject(MessageService);
  private formService = inject(FormService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  editmode = false;
  link!: Link;
  linkTypes!: LinkType[];
  linksEditForm!: FormGroup;

  ngOnInit(): void {	
    this.route.params
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      (params: Params) => {
        this.editmode = params['id'] != null;
      }
    )
    this.createForm();
    if(this.editmode) this.loadDataAndUpdateForm();
    this.formService.cancelActionComplete$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (componentId) => {
          if (componentId === this.componentId) 
            this.reloadData();
        }
      });
  }

  onSubmit() {
    if (this.linksEditForm.valid) {
      if (this.editmode) this.putLink();
      else this.postLink();
      this.formService.triggerSubmit(this.componentId);
    } 
    else {
      console.log('Form not submitted');
    }
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLink();
      } 
    });
  }

  onNavigateBack(): void {
    this.formService.triggerCancel(this.componentId);	
    this.router.navigate(['/admin/links']);
  }

  onReset() {
    this.formService.triggerCancel(this.componentId);	

  }

  reloadData(): void {
    if(this.editmode) {
      this.loadDataAndUpdateForm();
    } else {
      this.linksEditForm.reset();
    }
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
  
  loadDataAndUpdateForm(): void {
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
      this.documents.push({
          id: link.image.id,
          name: link.image.name,
          contentType: link.image.contentType,
          documentCategory: link.image.documentCategory,
          url: link.image.url
        } as Document);
      this.updateForm(link);
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

  private updateForm(link: Link): void {
    this.linksEditForm.patchValue({
      'body': link.body,
      'image': link.image.id,
      'linkType': link.linkType.id,
      'title': link.title,
      'url': link.url,
    });
  }

  private putLink(): void {
    const linkRequest: PutLinkRequest = {
      id: this.link.id,
      body: this.linksEditForm.value.body,
      imageId: this.link.image.id,
      linkTypeId: this.linksEditForm.value.linkType,
      title: this.linksEditForm.value.title,
      url: this.linksEditForm.value.url,
    };
    this.linkService.putLink(linkRequest, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (link: Link) => {
          if (link) this.messageService.showSuccessMessage('editLink', 'Link gewijzigd');
        },
        complete: () => {
          this.editmode = false; 
          this.onNavigateBack();
        }
      });
  }

  private postLink(): void {
    const linkRequest: PostLinkRequest = {
      body: this.linksEditForm.value.body,
      imageId: this.documents[0].id,
      linkTypeId: this.linksEditForm.value.linkType,
      title: this.linksEditForm.value.title,
      url: this.linksEditForm.value.url,
    };
    this.linkService.postLink(linkRequest, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (link: Link) => {
          if (link) this.messageService.showSuccessMessage('addLink', 'Link toegevoegd');
        },
        complete: () => {
          this.editmode = false; 
          this.onNavigateBack();
        }
    });
  }

  private deleteLink(): void {
    this.linkService.deleteLink(this.link.id, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('deleteLink', 'Link verwijderd');
        },
        complete: () => {
          this.editmode = false; 
          this.onNavigateBack();
        }
      });
    }
}
