import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  loading = true;
  @Input() imageUrl: string;

  onLoad(): void {
    this.loading = false;
  }
}
