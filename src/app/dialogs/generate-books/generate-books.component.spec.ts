import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBooksComponent } from './generate-books.component';

describe('GenerateBooksComponent', () => {
  let component: GenerateBooksComponent;
  let fixture: ComponentFixture<GenerateBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
