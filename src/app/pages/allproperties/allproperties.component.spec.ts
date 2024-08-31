import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpropertiesComponent } from './allproperties.component';

describe('AllpropertiesComponent', () => {
  let component: AllpropertiesComponent;
  let fixture: ComponentFixture<AllpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllpropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
