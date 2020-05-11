import { Component, Input } from "@angular/core";
import { OrderItem } from "@rota/core/models";

@Component({
  selector: "order-list-item",
  templateUrl: "./order-list-item.component.html",
  styleUrls: ["./order-list-item.component.scss"],
})
export class OrderListItemComponent {
  @Input() orderItem: OrderItem;
  @Input() isLoading: boolean;
  open = true;
}
