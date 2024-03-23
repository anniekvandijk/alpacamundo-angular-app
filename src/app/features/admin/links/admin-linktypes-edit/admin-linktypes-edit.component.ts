import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { LinkType } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';
import { MessageService } from 'src/app/shared/features/messages/message.service';

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
  ],
  templateUrl: './admin-linktypes-edit.component.html',
})
export class AdminLinkTypesEditComponent implements OnInit{
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private linkService = inject(LinkService);
  private messageService = inject(MessageService);
  public linkTypeEditForm!: FormGroup;
  public linkType!: LinkType;

  ngOnInit(): void {
    this.createForm();
    this.getLinkType();	
  }

  private createForm() {
    this.linkTypeEditForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]), 
    });
  }
  public onSubmit() {
    if (this.linkTypeEditForm.valid) {
      console.log('Form submitted', this.linkTypeEditForm);
      this.linkType.name = this.linkTypeEditForm.value.name,
      this.putLinkType(this.linkType);
      this.linkTypeEditForm.reset();
    } 
    else {
      this.linkTypeEditForm.reset(this.linkTypeEditForm.value);
      console.log('Form not submitted');
    }
  }

  private getLinkType(): void {
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
      }
    );
  }

  private putLinkType(linkType: LinkType) {
    this.linkService.putLinkType(linkType, this.componentId)
      .subscribe(
        (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('editLinkType', 'LinkType gewijzigd');
        }
      );
  }
}
