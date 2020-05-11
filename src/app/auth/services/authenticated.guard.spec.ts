import { inject, TestBed } from "@angular/core/testing";
import { RedirectIfFullyAuthenticated } from "./authenticated.guard";

describe("RedirectIfFullyAuthenticated", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectIfFullyAuthenticated]
    });
  });

  it("should ...", inject([RedirectIfFullyAuthenticated], (guard: RedirectIfFullyAuthenticated) => {
    expect(guard).toBeTruthy();
  }));
});
