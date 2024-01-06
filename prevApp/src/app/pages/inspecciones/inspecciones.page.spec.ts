import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspeccionesPage } from './inspecciones.page';

describe('InspeccionesPage', () => {
  let component: InspeccionesPage;
  let fixture: ComponentFixture<InspeccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspeccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
