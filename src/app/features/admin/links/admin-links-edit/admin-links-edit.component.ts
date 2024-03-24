import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Observable, forkJoin, switchMap, tap } from 'rxjs';
import { Link, LinkType } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
  public linkTypes!: LinkType[];
  public linksEditForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
    this.loadDataAndUpdateForm();
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
      'body': new FormControl('', [Validators.required]), 
      'image': new FormControl('', [Validators.required]),
      'linkType': new FormControl('', [Validators.required]),
      'title': new FormControl('', [Validators.required]),
      'url': new FormControl('', [Validators.required]),
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
      this.updateForm(link);
    });
  }

  private updateForm(link: Link): void {
    console.log('Link', this.link);
    console.log('LinkTypes', this.linkTypes)

    this.linksEditForm.patchValue({
      'body': link.body,
      'image': link.image,
      'linkType': link.linkType.id,
      'title': link.title,
      'url': link.url,
    });
    console.log('Form updated', this.linksEditForm);
  }
}
