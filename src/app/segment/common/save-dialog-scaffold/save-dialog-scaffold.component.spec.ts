import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveDialogScaffoldComponent } from './save-dialog-scaffold.component';

describe('SaveDialogScaffoldComponent', () => {
  let component: SaveDialogScaffoldComponent;
  let fixture: ComponentFixture<SaveDialogScaffoldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaveDialogScaffoldComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveDialogScaffoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
