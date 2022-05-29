import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontobancoComponent } from './montobanco.component';

describe('MontobancoComponent', () => {
  let component: MontobancoComponent;
  let fixture: ComponentFixture<MontobancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontobancoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontobancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
