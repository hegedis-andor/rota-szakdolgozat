import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingIndicatorModule } from "../shared/loading-indicator/loading-indicator.module";
import { SnackbarModule } from "../shared/snackbar";
import { OrderingRoutingModule } from "./ordering-routing.module";
import { ProductCardComponent } from "./product-list/product-card/product-card.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductPageModule } from "./product-page/product-page.module";
import { OrderingService } from "./services";
import { OrderingStoreModule } from "./store/ordering-store.module";
import { TableSelectorComponent } from "./table-selector/table-selector.component";

@NgModule({
  declarations: [TableSelectorComponent, ProductListComponent, ProductCardComponent],
  imports: [
    CommonModule,
    OrderingRoutingModule,
    OrderingStoreModule,
    TranslateModule.forChild(),
    LoadingIndicatorModule,
    ProductPageModule,
    SnackbarModule
  ],
  providers: [OrderingService]
})
export class OrderingModule {}
