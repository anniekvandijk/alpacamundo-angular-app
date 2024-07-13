import { Component, DestroyRef, OnInit, Output, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { Alpaca, Image } from "src/app/features/alpacas/models/alpaca.model";
import { AlpacaService } from "src/app/features/alpacas/services/alpaca.service";
import { DeleteConfirmationDialogComponent } from "src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { FormService } from "../../documents/services/form.service";
import { Document } from '../../documents/models/document.model';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FileUploadComponent } from "../../documents/file-upload/file-upload.component";
import * as AlpacaConstants from "src/app/features/alpacas/models/alpaca-constants";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-admin-alpacas-edit',
  standalone: true,
  providers: [ MatDatepickerModule ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatTabsModule,
    MatIconModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  private formService = inject(FormService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  editmode = false;
  alpaca!: Alpaca;
  alpacas: Alpaca[] = [];
  maleAlpacas: Alpaca[] = [];
  femaleAlpacas: Alpaca[] = [];
  alpacasEditForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


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
    this.alpacaService.getAlpacas(this.componentId) 
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (alpacas: Alpaca[]) => {
          this.alpacas = alpacas;
          this.maleAlpacas = alpacas
            .filter(alpaca =>
                alpaca.gender === 'Hengst'
                || alpaca.gender === 'Ruin'
              )
            .sort((a, b) => a.longName.localeCompare(b.longName));
          this.femaleAlpacas = alpacas
            .filter(alpaca =>
              alpaca.gender === 'Merrie'
            )
            .sort((a, b) => a.longName.localeCompare(b.longName));
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
    this.alpacasEditForm = this.fb.group({
      'shortName': ['', [Validators.required, Validators.maxLength(255)]], 
      'longName': ['', [Validators.required, Validators.maxLength(255)]],
      'dam': this.fb.group({
        'id': '',  
        'shortName': '',
        'longName': '',
      }),
      'sire': this.fb.group({
        'id': '',  
        'shortName': '',
        'longName': '',
      }),
      'offspring': this.fb.array([]),
      'showresults': this.fb.array([]),
      'gender': ['', [Validators.required]],
      'breed': ['Huacaya', [Validators.required]],
      'color': ['', [Validators.required]],
      'category': ['', [Validators.required]],
      'status': ['', [Validators.required]],
      'dateOfBirth': ['', [Validators.required]],
      'bornOnFarm': true,
      'studFee': 0,
      'sellPrice': 0,
      'description': ['', [Validators.required, Validators.maxLength(1000)]],
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
    this.alpacasEditForm.patchValue(alpaca);
    this.patchOffspring();
    this.onChangeDamId();
    this.onChangeSireId();
  }

  
  patchOffspring(): void {
    const offspring = this.alpacasEditForm.get('offspring') as FormArray;
    offspring.clear();
    this.alpaca.offspring.forEach((offspringAlpaca: Alpaca) => {
      offspring.push(this.fb.group({
        'id': offspringAlpaca.id,
        'shortName': offspringAlpaca.shortName,
        'longName': offspringAlpaca.longName,
      }));
    });
  }

  get offspringControls() {
    return (<FormArray>this.alpacasEditForm.get('offspring')).controls;
  }

  addOffspring(): void {
    const offspring = this.alpacasEditForm.get('offspring') as FormArray;
    offspring.push(this.fb.group({
      'id': '',  
    }));
  }

  getOffspring(index: number): string | undefined {
    const offspring = this.alpacasEditForm.get('offspring') as FormArray;
    return (offspring.at(index) as FormGroup).value.id;
  }

  deleteOffspring(index: number): void {
    const offspring = this.alpacasEditForm.get('offspring') as FormArray;
    offspring.removeAt(index);
  }

  public onChangeDamId(): void {
    if (this.alpacasEditForm.get('dam.id')?.value === null 
    || this.alpacasEditForm.get('dam.id')?.value === '') {
      this.alpacasEditForm.get('dam.longName')?.enable();
    } else {
      this.alpacasEditForm.get('dam.longName')?.disable();
    }
  }

  public onChangeSireId(): void {
    if (this.alpacasEditForm.get('sire.id')?.value === null 
    || this.alpacasEditForm.get('sire.id')?.value === '') {
      this.alpacasEditForm.get('sire.longName')?.enable();
    } else {
      this.alpacasEditForm.get('sire.longName')?.disable();
    }
  }

  private putAlpaca(): void {
    console.log('putAlpacaform', this.alpacasEditForm.getRawValue());
    this.alpacaService.putAlpaca(this.alpaca, this.componentId)

  }

  private postAlpaca(): void {
    //TODO: implement postAlpaca

  }

  private deleteAlpaca(): void {
    //TODO: implement deleteAlpaca
  }

  
}