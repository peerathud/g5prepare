import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoolbarComponent } from './doctoolbar.component';

describe('DoctoolbarComponent', () => {
  let component: DoctoolbarComponent;
  let fixture: ComponentFixture<DoctoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
