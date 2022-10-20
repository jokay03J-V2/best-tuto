import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoPostComponent } from './tuto-post.component';

describe('TutoPostComponent', () => {
  let component: TutoPostComponent;
  let fixture: ComponentFixture<TutoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
