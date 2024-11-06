import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfoundComponent } from './unfound.component';

describe('UnfoundComponent', () => {
  let component: UnfoundComponent;
  let fixture: ComponentFixture<UnfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnfoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
