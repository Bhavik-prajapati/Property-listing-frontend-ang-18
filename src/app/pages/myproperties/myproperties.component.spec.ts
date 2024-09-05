import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypropertiesComponent } from './myproperties.component';

describe('MypropertiesComponent', () => {
  let component: MypropertiesComponent;
  let fixture: ComponentFixture<MypropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
