import { Component, DestroyRef, OnInit, Output, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { Alpaca, Image } from "src/app/features/alpacas/models/alpaca.model";
import { AlpacaService } from "src/app/features/alpacas/services/alpaca.service";
import { DeleteConfirmationDialogComponent } from "src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { MessageService } from "src/app/shared/components/messages/message.service";
import { FormService } from "../../documents/services/form.service";
import { Document } from '../../documents/models/document.model';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatRadioModule} from '@angular/material/radio';
import { FileUploadComponent } from "../../documents/file-upload/file-upload.component";
import * as AlpacaConstants from "src/app/features/alpacas/models/alpaca-constants";

@Component({
  selector: 'app-admin-alpacas-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    DeleteConfirmationDialogComponent,
    FileUploadComponent
  ],
  templateUrl: './admin-alpacas-edit.component.html',
})
export class AdminAlpacasEditComponent  implements OnInit{

  @Output() mainImage: Document[] = [];
  @Output() images: Document[] = [];
  @Output() pedigree: Document[] = [];
  readonly componentId = this.constructor.name;
  readonly colors = AlpacaConstants.colors;
  readonly breeds = AlpacaConstants.breed;
  readonly categories = AlpacaConstants.category;
  readonly statusses = AlpacaConstants.status;
  readonly gender = AlpacaConstants.gender;
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private alpacaService = inject(AlpacaService);
  private messageService = inject(MessageService);
  private formService = inject(FormService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  editmode = false;
  alpaca!: Alpaca;
  alpacasEditForm!: FormGroup;

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
    if (this.alpacasEditForm.valid) {
      if (this.editmode) this.putAlpaca();
      else this.postAlpaca();
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
        this.deleteAlpaca();
      } 
    });
  }

  onNavigateBack(): void {
    this.formService.triggerCancel(this.componentId);	
    this.router.navigate(['/admin/alpacas']);
  }
  onReset() {
    this.formService.triggerCancel(this.componentId);	
  }

  reloadData(): void {
    if(this.editmode) {
      this.loadDataAndUpdateForm();
    } else {
      this.alpacasEditForm.reset();
    }
  }

  private createForm() {
    this.alpacasEditForm = new FormGroup({
      'shortName': new FormControl('', [Validators.required, Validators.maxLength(255)]), 
      'longName': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'gender': new FormControl('', [Validators.required]),
      'breed': new FormControl('', [Validators.required]),
      'color': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required]),
      'dateOfBirth': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    });
  }

  loadDataAndUpdateForm(): void {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((params: Params) => 
        this.getAlpaca(params['id'])
      ),
    )
    .subscribe((alpaca: Alpaca) => {
      this.alpaca = alpaca;
      // add all images link to the documents array
      if (this.alpaca && this.alpaca.mainImage) {
        this.mainImage.push({
          id: alpaca.mainImage.id,
          name: alpaca.mainImage.name,
          contentType: alpaca.mainImage.contentType,
          documentCategory: alpaca.mainImage.documentCategory,
          url: alpaca.mainImage.url
        } as Document);
      }
      if (this.alpaca && this.alpaca.pedigree) {
        this.pedigree.push({
          id: alpaca.pedigree.id,
          name: alpaca.pedigree.name,
          contentType: alpaca.pedigree.contentType,
          documentCategory: alpaca.pedigree.documentCategory,
          url: alpaca.pedigree.url
        } as Document);
      }
      if (this.alpaca && this.alpaca.images && this.alpaca.images.length > 0) {
        this.images = alpaca.images.map((image: Image) => {
          return {
            id: image.id,
            name: image.name,
            contentType: image.contentType,
            documentCategory: image.documentCategory,
            url: image.url
          } as Document;
        });
      }
      this.updateForm(alpaca);

    });
  }

  private getAlpaca(id: string): Observable<Alpaca> {
    return this.alpacaService.getAlpaca(id, this.componentId)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  private updateForm(alpaca: Alpaca): void {
    this.alpacasEditForm.patchValue({
      'shortName': alpaca.shortName, 
      'longName': alpaca.longName,
      'gender': alpaca.gender,
      'breed': alpaca.breed,
      'color': alpaca.color,
      'category': alpaca.category,
      'status': alpaca.status,
      'dateOfBirth': alpaca.dateOfBirth,
      'description': alpaca.description,
    });
  }

  private putAlpaca(): void {
    //TODO: implement putAlpaca
  }

  private postAlpaca(): void {
    //TODO: implement postAlpaca
  }

  private deleteAlpaca(): void {
    //TODO: implement deleteAlpaca
  }

  
}