import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAvatarComponent } from './text-avatar.component';

describe('TextAvatarComponent', () => {
  let component: TextAvatarComponent;
  let fixture: ComponentFixture<TextAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
