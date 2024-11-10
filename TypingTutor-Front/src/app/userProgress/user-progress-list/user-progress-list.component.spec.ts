import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressListComponent } from './user-progress-list.component';

describe('UserProgressListComponent', () => {
  let component: UserProgressListComponent;
  let fixture: ComponentFixture<UserProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProgressListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
