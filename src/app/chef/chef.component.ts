import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Order, OrderItem, OrderItemStatus } from "@rota/core/models";
import { AppState } from "@rota/core/models/app-state";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, first, map, takeUntil, tap } from "rxjs/operators";
import { RestaurantStoreSelectors } from "../root-store/restaurant-store";
import { ConfirmationDialogComponent, DialogConfig, DialogService } from "../shared/dialog";
import { SnackbarConfig, SnackbarService } from "../shared/snackbar/services";
import { StatusModifierComponent } from "./status-modifier-dialog";
import { ChefStoreActions, ChefStoreSelectores } from "./store";

const dialogConfig: DialogConfig = {
  backdropClass: "dialog-backdrop-light",
  autoFocus: false,
};

@Component({
  selector: "rota-chef",
  templateUrl: "./chef.component.html",
  styleUrls: ["./chef.component.scss"],
})
export class ChefComponent implements OnInit, OnDestroy {
  private currentOrdersId$ = new BehaviorSubject<string[]>(undefined);
  private ngUnsubscribe$ = new Subject<void>();
  private mute: boolean;
  isLoading$: Observable<boolean>;
  orders$: Observable<Order[]>;
  constructor(private store$: Store<AppState>, private dialogService: DialogService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.orders$ = this.store$.pipe(select(RestaurantStoreSelectors.selectActiveOrders));
    this.isLoading$ = this.store$.pipe(select(ChefStoreSelectores.selectIsLoading), tap(console.log));
    this.initCurrentOrdersId();
    this.alertOnNewOrder();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
  }

  editItemStatus(orderItem: OrderItem, order: Order): void {
    this.dialogService
      .openDialog<StatusModifierComponent, OrderItemStatus>(StatusModifierComponent, {
        ...dialogConfig,
        data: { status: orderItem.status },
      })
      .afterClosed()
      .subscribe((selectedOptionStatus) => {
        if (!selectedOptionStatus) {
          return;
        }

        const updatedOrderItem: OrderItem = { ...orderItem, status: selectedOptionStatus };
        const updatedItems: OrderItem[] = order.items.map((item) => (item.name === orderItem.name ? updatedOrderItem : item));

        const updatedOrder: Order = this.updateOrder(order, updatedItems);
        this.store$.dispatch(ChefStoreActions.updateOrder({ order: updatedOrder }));
      });
  }

  markOrderAsDone(order: Order): void {
    const dialogData: { title: string; text: string; optionalText?: string; actions: { confrim: string; cancel: string } } = {
      title: "CHEF.CONFIRMATION_DIALOG.TITLE",
      text: "CHEF.CONFIRMATION_DIALOG.TEXT",
      actions: {
        cancel: "CHEF.CONFIRMATION_DIALOG.ACTION_CANCEL",
        confrim: "CHEF.CONFIRMATION_DIALOG.ACTION_CONFIRM",
      },
      optionalText: order.tableName,
    };

    this.dialogService
      .openDialog<ConfirmationDialogComponent, boolean>(ConfirmationDialogComponent, { ...dialogConfig, data: dialogData })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        const updatedOrder: Order = { ...order, status: "done" };
        this.store$.dispatch(ChefStoreActions.updateOrder({ order: updatedOrder }));
      });
  }

  hasItemInPreparingStatus(order: Order): boolean {
    return order.items.some((item) => item.status === "preparing");
  }

  trackOrdersBy(_index: number, order: Order): string {
    if (!order) {
      return null;
    }

    return order.id;
  }

  private initCurrentOrdersId(): void {
    this.orders$
      .pipe(
        first(),
        map((orders) => {
          return orders.map((order) => order.id);
        })
      )
      .subscribe((orderIds) => this.currentOrdersId$.next(orderIds));
  }

  private alertOnNewOrder(): void {
    const newOrders$ = this.getNewOrders();
    newOrders$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((newOrders) => {
      const config: SnackbarConfig = {
        position: { horizontal: "right", vertical: "top" },
        duration: 3500,
        data: {
          text: "CHEF.SNACKBAR.TEXT",
          subText: newOrders.length === 1 ? newOrders[0].tableName : null,
          actionName: "CHEF.SNACKBAR.ACTION_LABEL",
        },
        panelClass: "snackbar-success",
      };
      this.snackbarService.openSnackBar(config);
      if (!this.mute) {
        this.playAlertSound();
      }
    });
  }

  private playAlertSound(): void {
    const audio = new Audio("assets/sounds/notification_decorative-02.ogg");
    audio.load();
    audio.play();
  }

  private getNewOrders(): Observable<Order[]> {
    return this.orders$.pipe(
      map((orders) => {
        const newOrdersId = orders.map((order) => order.id);
        const newOrders: Order[] = [];

        newOrdersId.forEach((newOrderId) => {
          if (!knownOrder(this.currentOrdersId$.value, newOrderId)) {
            newOrders.push(orders.find((order) => order.id === newOrderId));
          }
        });
        this.currentOrdersId$.next(newOrdersId);

        return newOrders;
      }),
      filter((orders) => orders.length > 0)
    );
  }

  private updateOrder(oldOrder: Order, updatedOrderItems: OrderItem[]): Order {
    const order = { ...oldOrder, items: [...updatedOrderItems] };
    if (!this.hasItemInPreparingStatus(order)) {
      return { ...order, status: "done" };
    }

    return order;
  }
}

function knownOrder(knownOrderIds: string[], orderId: string): boolean {
  return knownOrderIds.some((knownOrderId) => knownOrderId === orderId);
}
