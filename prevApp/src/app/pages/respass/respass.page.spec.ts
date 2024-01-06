import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespassPage } from './respass.page';

describe('RespassPage', () => {
  let component: RespassPage;
  let fixture: ComponentFixture<RespassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RespassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
