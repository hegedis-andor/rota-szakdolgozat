import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadingIndicatorModule } from "@rota/shared/loading-indicator/loading-indicator.module";
import { ProductCardComponent } from "./product-card.component";

fdescribe("ProductCardComponent", () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [LoadingIndicatorModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be loading OnInit", () => {
    expect(component.loading).toBe(true);
  });

  it("should set loading to false when onLoad is called", () => {
    component.onLoad();
    expect(component.loading).toBe(false);
  });
});
