/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, DebugNode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker';

import { PlantasListComponent } from './plantas-list.component';
import { PlantasService } from '../plantas.service';
import { Planta } from '../planta';

describe('PlantasListComponent', () => {
  let component: PlantasListComponent;
  let fixture: ComponentFixture<PlantasListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ PlantasListComponent ],
      providers: [ PlantasService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantasListComponent);
    component = fixture.componentInstance;

    const tipos: string[] = ['Interior','Interior','Exterior'];

    for(let i = 0; i < 3; i++) {
      const planta = new Planta(
        faker.datatype.number(),
        faker.lorem.sentence(3),
        faker.lorem.sentence(3),
        tipos[i],
        faker.datatype.number(),
        faker.lorem.sentence(1),
        faker.lorem.sentence(),
        );
        component.plantas.push(planta);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component has a table', () => {
    expect(debug.query(By.css("tbody")).childNodes.length).toBeGreaterThan(0);
  });

  it('should have 3 tr elements, one for each  plant', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(3);
  });

  it('should have the corresponding info to the plants', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i)=>{
      let children: DebugElement[] = tr.children;
      expect(children[0].nativeElement.textContent).toEqual(
        component.plantas[i].id.toString());
      expect(children[1].nativeElement.textContent).toEqual(
        component.plantas[i].nombre_comun);
      expect(children[2].nativeElement.textContent).toEqual(
        component.plantas[i].tipo);
      expect(children[3].nativeElement.textContent).toEqual(
        component.plantas[i].clima);
    })
  });

  it('should display correctly the quantity of interior and exterior plants', () => {
    let total: DebugElement[] = debug.queryAll(By.css('#calculo-tipo p'));
    expect(total[0].nativeElement.textContent).toContain('Total plantas interior: 2');
    expect(total[1].nativeElement.textContent).toContain('Total plantas exterior: 1');
  });
});
