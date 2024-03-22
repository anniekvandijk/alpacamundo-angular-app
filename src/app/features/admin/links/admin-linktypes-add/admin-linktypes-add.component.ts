import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinkType } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';

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
  private linkService = inject(LinkService);
  private route = inject(ActivatedRoute);
  public linkType!: LinkType;
  public linkTypesAddForm!: FormGroup;

  ngOnInit(): void {	
    this.createForm();
  }

  private createForm() {
    this.linkTypesAddForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]), 
    });
  }
  public onSubmit() {
    if (this.linkTypesAddForm.valid) {
      console.log('Form submitted', this.linkTypesAddForm);
      this.linkTypesAddForm.reset();
    } 
    else {
      this.linkTypesAddForm.reset(this.linkTypesAddForm.value);
      console.log('Form not submitted');
    }
  }
}
