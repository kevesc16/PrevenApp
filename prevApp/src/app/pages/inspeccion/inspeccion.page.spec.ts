import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspeccionPage } from './inspeccion.page';

describe('InspeccionPage', () => {
  let component: InspeccionPage;
  let fixture: ComponentFixture<InspeccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
