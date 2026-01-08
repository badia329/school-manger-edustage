import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsomefeatureComponent } from './awsomefeature.component';

describe('AwsomefeatureComponent', () => {
  let component: AwsomefeatureComponent;
  let fixture: ComponentFixture<AwsomefeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwsomefeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsomefeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
