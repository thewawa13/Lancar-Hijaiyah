import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JilidPage } from './jilid.page';

describe('JilidPage', () => {
  let component: JilidPage;
  let fixture: ComponentFixture<JilidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JilidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
