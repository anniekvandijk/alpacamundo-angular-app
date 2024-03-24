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
import { DeleteConfirmationDialogComponent } from 'src/app/shared/features/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MessageService } from 'src/app/shared/features/messages/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PutLinkTypeRequest } from 'src/app/features/links/models/put-linkType-request.model';

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
  public linkTypeEditForm!: FormGroup;
  public linkType!: LinkType;

  ngOnInit(): void {
    this.createForm();
    this.getLinkTypeAndUpdateForm();	
  }

  public onNavigateBack(): void {
    this.router.navigate(['/admin/linktypes']);
  }

  public onSubmit() {
    if (this.linkTypeEditForm.valid) {
      const linkTypeRequest: PutLinkTypeRequest = 
      {
        id: this.linkType.id,
        name: this.linkTypeEditForm.value.name,
      }
      this.putLinkType(linkTypeRequest);
      this.onNavigateBack();
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
        this.deleteLinkType();
      } 
    });
  }

  public onReset() {
    this.getLinkTypeAndUpdateForm();
  }

  private getLinkTypeAndUpdateForm(): void {
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

  private createForm(): void {
    this.linkTypeEditForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]), 
    });
  }

  private updateForm(linkType: LinkType): void {
    this.linkTypeEditForm.patchValue({
      'name': linkType.name,
    });
  }

  private putLinkType(linkType: PutLinkTypeRequest): void {
    this.linkService.putLinkType(linkType, this.componentId)
      .subscribe(
        (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('editLinkType', 'Link categorie gewijzigd');
        }
      );
    
  }

  private deleteLinkType(): void {
    this.linkService.deleteLinkType(this.linkType.id, this.componentId)
      .subscribe({
        next: (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('deleteLinkType', 'Link categorie verwijderd');
        },
        complete: () => { 
          this.onNavigateBack();}
      });
    }
}
