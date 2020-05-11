import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AmountSelectorComponent } from "./amount-selector.component";

fdescribe("AmountSelectorComponent", () => {
  let component: AmountSelectorComponent;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmountSelectorComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    component = testHostFixture.debugElement.query(By.directive(AmountSelectorComponent)).componentInstance;
    testHostFixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set the initial value", () => {
    expect(component.initialValue).toBe(testHostComponent.initialValue);
  });

  it("should set min value", () => {
    expect(component.minValue).toBe(testHostComponent.minValue);
  });

  it("should set max value", () => {
    expect(component.maxValue).toBe(testHostComponent.maxValue);
  });

  it("should decrease the value by one", () => {
    component.decrease();
    const expected = testHostComponent.initialValue - 1;
    expect(testHostComponent.newValue).toBe(expected);
  });

  it("should increase the value by one", () => {
    component.increase();
    const expected = testHostComponent.initialValue + 1;
    expect(testHostComponent.newValue).toBe(expected);
  });

  it("should return min value if decrease is called when current value equal min value", () => {
    component.decrease();
    component.decrease();
    expect(testHostComponent.newValue).toBe(testHostComponent.minValue);
  });

  it("should return max value if increase is called when current value equal max value", () => {
    component.increase();
    component.increase();
    expect(testHostComponent.newValue).toBe(testHostComponent.maxValue);
  });
});

@Component({
  template: `<amount-selector
    [initialValue]="initialValue"
    [minValue]="minValue"
    [maxValue]="maxValue"
    (valueChange)="newValue = $event"
  ></amount-selector>`,
})
class TestHostComponent {
  minValue = 0;
  initialValue = 2;
  maxValue = 4;

  newValue: number;
}
