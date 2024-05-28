import { Component, OnInit } from "@angular/core";
import { AdminFleecesEditComponent } from "./admin-fleeces-edit/admin-fleeces-edit.component";

@Component({
  selector: 'app-admin-fleeces',
  standalone: true,
  imports: [AdminFleecesEditComponent],
  templateUrl: './admin-fleeces.component.html',
  styleUrls: ['']
})
export class AdminFleecesComponent implements OnInit{
  
    alpacaId!: string;
  
    ngOnInit(): void {
      this.alpacaId = '16C254DB-DD75-4CD3-9967-0D6C1D1B0DFB';
    }
}