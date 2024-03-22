import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Link } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';

@Component({
  selector: 'app-admin-links-edit',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './admin-links-edit.component.html',
  styleUrl: './admin-links-edit.component.scss'
})
export class AdminLinksEditComponent implements OnInit{
  private componentId = this.constructor.name;
  private readonly destroyRef = inject(DestroyRef);
  private linkService = inject(LinkService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public link!: Link;
  public linkForm!: FormGroup;
  public submitError = false;

  ngOnInit(): void {	
    this.getLink();
    if (this.link) {
      this.createForm();
    }
  }

  private createForm() {
    this.linkForm = this.formBuilder.group(
      {
        title: [this.link.title, [Validators.required]], 
      },
      {
        updateOn: 'blur'
      }
    );
  }

  public onSubmit() {
    if (this.linkForm.valid) {
      this.submitError = false;
      this.linkForm.reset();
      console.log('Form submitted');
    } 
    else {
      this.submitError = true;
      this.linkForm.reset(this.linkForm.value);
      console.log('Form not submitted');
    }
  }

  private getLink() {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => this.linkService.getLink(params['id'], this.componentId)),
    )
    .pipe (
      tap((link: Link) => { console.log(link); })
    )
    .subscribe((link: Link) => {
      this.link = link;
    });
  }
}
