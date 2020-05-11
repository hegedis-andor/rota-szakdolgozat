import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { StatusModifierComponent } from "./status-modifier-dialog.component";

describe("StatusModifierComponent", () => {
  let component: StatusModifierComponent;
  let fixture: ComponentFixture<StatusModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusModifierComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
