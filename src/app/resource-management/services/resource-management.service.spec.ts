import { TestBed } from "@angular/core/testing";
import { ResourceManagementService } from "./resource-management.service";

describe("ResourceManagementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ResourceManagementService = TestBed.get(ResourceManagementService);
    expect(service).toBeTruthy();
  });
});
