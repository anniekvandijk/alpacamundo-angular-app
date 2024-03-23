import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Link } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-links-edit',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './admin-links-edit.component.html',
})
export class AdminLinksEditComponent implements OnInit{
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private linkService = inject(LinkService);
  private route = inject(ActivatedRoute);
  public link!: Link;
  public linksEditForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
    this.getLinkAndUpdateForm();
  }

  public navigateToLinkList(): void {
    this.router.navigate(['/admin/links']);
  }

  public onSubmit() {
    if (this.linksEditForm.valid) {
      console.log('Form submitted', this.linksEditForm);
    } 
    else {
      console.log('Form not submitted');
    }
  }

  private createForm() {
    this.linksEditForm = new FormGroup({
      'body': new FormControl(null, [Validators.required]), 
      'image': new FormControl(null, [Validators.required]),
      'linkType': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'url': new FormControl(null, [Validators.required]),
    });
  }

  private getLinkAndUpdateForm(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => 
        this.linkService.getLink(params['id'], this.componentId)
      ),
    )
    .subscribe(
      (link: Link) => { 
        this.link = link; 
        this.updateForm(link);
      }
    );
  }

  private updateForm(link: Link): void {
    this.linksEditForm.patchValue({
      body: link.body,
      image: link.image,
      linkType: link.linkType,
      title: link.title,
      url: link.url,
    });
  }
}
