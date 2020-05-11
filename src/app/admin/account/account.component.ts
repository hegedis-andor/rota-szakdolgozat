import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "rota-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  @Input() userEmail: string;
  @Input() restaurantName: string;
  @Output() signOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
