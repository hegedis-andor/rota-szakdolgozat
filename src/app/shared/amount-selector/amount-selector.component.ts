import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "amount-selector",
  templateUrl: "./amount-selector.component.html",
  styleUrls: ["./amount-selector.component.scss"]
})
export class AmountSelectorComponent implements OnInit {
  @Input() initialValue = 0;
  @Input() minValue: number;
  @Input() maxValue: number;
  @Output() valueChange = new EventEmitter<number>();

  amount: number;

  constructor() {}

  ngOnInit() {
    this.amount = this.initialValue;
  }

  decrease(): void {
    if (this.minValue && this.amount - 1 < this.minValue) {
      return;
    }
    this.amount--;
    this.valueChange.emit(this.amount);
  }

  increase(): void {
    if (this.maxValue && this.amount + 1 > this.maxValue) {
      return;
    }
    this.amount++;
    this.valueChange.emit(this.amount);
  }
}
