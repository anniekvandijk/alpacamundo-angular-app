import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LinkService } from 'src/app/features/links/services/link.service';
import { PostLinkTypeRequest } from 'src/app/features/links/models/post-linkType-request.model';
import { MessageService } from 'src/app/shared/features/messages/message.service';

@Component({
  selector: 'app-admin-linktypes-add',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './admin-linktypes-add.component.html',
})
export class AdminLinkTypesAddComponent implements OnInit{
  private componentId = this.constructor.name;
  private router = inject(Router);
  private linkService = inject(LinkService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  public linkTypesAddForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
  }

  public navigateToLinkTypesList(): void {
    this.router.navigate(['/admin/linktypes']);
  }

  private createForm() {
    this.linkTypesAddForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]), 
    });
  }
  public onSubmit() {
    if (this.linkTypesAddForm.valid) {
      const linkTypeRequest: PostLinkTypeRequest = {
        name: this.linkTypesAddForm.value.name,
      };  
      this.postLinkType(linkTypeRequest);
    } 
    else {
      console.log('Form not submitted');
    }
  }

  private postLinkType(linkType: PostLinkTypeRequest) {
    this.linkService.postLinkType(linkType, this.componentId)
      .subscribe({
        next: (okResult: boolean) => {
          if (okResult) this.messageService.showSuccessMessage('addLinkType', 'LinkType toegevoegd');
        },
        complete: () => {
          this.navigateToLinkTypesList();
        }
    });
  }
}
