import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEspecialistaComponent } from './turnos-especialista.component';

describe('TurnosEspecialistaComponent', () => {
  let component: TurnosEspecialistaComponent;
  let fixture: ComponentFixture<TurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
