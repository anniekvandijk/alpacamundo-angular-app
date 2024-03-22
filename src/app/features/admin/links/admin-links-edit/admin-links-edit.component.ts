import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
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
  private linkService = inject(LinkService);
  private route = inject(ActivatedRoute);
  public link!: Link;
  public linksEditForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
    this.getLink();
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

  public onSubmit() {
    if (this.linksEditForm.valid) {
      console.log('Form submitted', this.linksEditForm);
      this.linksEditForm.reset();
    } 
    else {
      this.linksEditForm.reset(this.linksEditForm.value);
      console.log('Form not submitted');
    }
  }

  private getLink() {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => 
        this.linkService.getLink(params['id'], this.componentId)
      ),
    )
    .pipe(
      tap((link: Link) => { 
        console.log(link); 
      })
    )
    .subscribe({
      next: (link: Link) => { this.link = link; },
      error: (error: any) => { console.error(error); },
      complete: () => { console.log('Link loaded'); }
      }
    );
  }
}
