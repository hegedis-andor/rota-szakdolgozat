import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ButtonOutlinedComponent } from "./button-outlined.component";

describe("ButtonOutlinedComponent", () => {
  let component: ButtonOutlinedComponent;
  let fixture: ComponentFixture<ButtonOutlinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonOutlinedComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonOutlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
