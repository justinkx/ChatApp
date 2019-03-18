import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelPage } from './create-channel.page';

describe('CreateChannelPage', () => {
  let component: CreateChannelPage;
  let fixture: ComponentFixture<CreateChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
