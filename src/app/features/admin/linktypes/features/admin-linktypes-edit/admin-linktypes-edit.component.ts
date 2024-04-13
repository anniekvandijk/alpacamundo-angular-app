import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { LinkType } from 'src/app/features/links/models/link.model';
import { LinkService } from 'src/app/features/links/services/link.service';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MessageService } from 'src/app/shared/components/messages/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PutLinkTypeRequest } from 'src/app/features/links/models/put-linkType-request.model';
import { PostLinkTypeRequest } from 'src/app/features/links/models/post-linkType-request.model';

@Component({
  selector: 'app-admin-linktypes-edit',
  standalone: true,
  imports: [
  RouterModule,
  ReactiveFormsModule, 
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  DeleteConfirmationDialogComponent,
  ],
  templateUrl: './admin-linktypes-edit.component.html',
})
export class AdminLinkTypesEditComponent implements OnInit{
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private linkService = inject(LinkService);
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);
  editmode = false;
  linkTypeEditForm!: FormGroup;
  linkType!: LinkType;

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      (params: Params) => {
        this.editmode = params['id'] != null;
      }
    )
    this.createForm();
    if (this.editmode) this.loadDataAndUpdateForm();	
  }

  onSubmit() {
    if (this.linkTypeEditForm.valid) {
      if (this.editmode) this.putLinkType();
      else this.postLinkType();
      this.editmode = false;
      this.onNavigateBack();
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
        this.deleteLinkType();
        this.editmode = false; 
        this.onNavigateBack();
      } 
    });
  }
 
  onNavigateBack(): void {
    this.router.navigate(['/admin/linktypes']);
  }

  onReset() {
    if(this.editmode) this.loadDataAndUpdateForm();
    else this.linkTypeEditForm.reset();
  }
  
  private createForm(): void {
    this.linkTypeEditForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]), 
    });
  }

  private loadDataAndUpdateForm(): void {
    this.route.params
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => 
        this.linkService.getLinkType(params['id'], this.componentId)
      ),
    )
    .subscribe(
      (linkType: LinkType) => { 
        this.linkType = linkType;
        this.updateForm(linkType);
      }
    );
  }


  private updateForm(linkType: LinkType): void {
    this.linkTypeEditForm.patchValue({
      'name': linkType.name,
    });
  }

  private putLinkType(): void {
    const linkTypeRequest: PutLinkTypeRequest = 
    {
      id: this.linkType.id,
      name: this.linkTypeEditForm.value.name,
    }
    this.linkService.putLinkType(linkTypeRequest, this.componentId)
      .subscribe({
        next: (linkType: LinkType) => {
          if (linkType) this.messageService.showSuccessMessage('editLinkType', 'Link categorie gewijzigd');
        }
      });
  }

  private postLinkType(): void {
    const linkTypeRequest: PostLinkTypeRequest = {
      name: this.linkTypeEditForm.value.name,
    }; 
    this.linkService.postLinkType(linkTypeRequest, this.componentId)
      .subscribe({
        next: (linkType: LinkType) => {
          if (linkType) this.messageService.showSuccessMessage('addLinkType', 'Link categorie toegevoegd');
        }
    }); 
  }

  private deleteLinkType(): void {
    this.linkService.deleteLinkType(this.linkType.id, this.componentId)
      .subscribe({
        next: (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('deleteLinkType', 'Link categorie verwijderd');
        }
      });
    }
}
