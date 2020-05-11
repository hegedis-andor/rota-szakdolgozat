import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { LoadResourcesComponent } from "./load-resources.component";

describe("LoadResourcesComponent", () => {
  let component: LoadResourcesComponent;
  let fixture: ComponentFixture<LoadResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadResourcesComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
