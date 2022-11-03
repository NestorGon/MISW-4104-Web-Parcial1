import { Component, OnInit } from '@angular/core';
import { Planta } from '../planta';
import { PlantasService } from '../plantas.service';

@Component({
  selector: 'app-plantas-list',
  templateUrl: './plantas-list.component.html',
  styleUrls: ['./plantas-list.component.css']
})
export class PlantasListComponent implements OnInit {

  plantas: Array<Planta> = [];
  constructor(private plantasService: PlantasService) { }

  getPlantas(): void {
    this.plantasService.getPlantas().subscribe((plantas) => {
      this.plantas = plantas;
    });
  }

  totalInterior(): number {
    let total: number = 0;
    this.plantas.forEach((value) => {
      if (value.tipo === 'Interior') {
        total += 1;
      }
    })
    return total;
  }

  totalExterior(): number {
    let total: number = 0;
    this.plantas.forEach((value) => {
      if (value.tipo === 'Exterior') {
        total += 1;
      }
    })
    return total;
  }

  ngOnInit() {
    this.getPlantas();
  }
}
