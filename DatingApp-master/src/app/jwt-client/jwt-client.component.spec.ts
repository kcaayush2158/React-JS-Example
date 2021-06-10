import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtClientComponent } from './jwt-client.component';

describe('JwtClientComponent', () => {
  let component: JwtClientComponent;
  let fixture: ComponentFixture<JwtClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
