import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { SelectedPlantService } from "src/app/core/services/selected-plant.service";
import { PlantListing } from "../../core/models/plant-listing";
import { User } from "../../core/models/user";
import { PlantQuantityService } from "../../core/services/plant-quantity.service";
import { RestService } from "../../core/services/rest.service";
import * as fromRoot from "../../reducers/index";

@Component({
  selector: "plant-listing-table",
  templateUrl: "./plant-listing-table.component.html",
  styleUrls: ["./plant-listing-table.component.scss"],
})
export class PlantListingTableComponent implements OnInit {
  public plantListings$: Observable<any>;
  // public plantType$: Observable<string>;
  // public user$: Observable<User>;
  public pageData$: Observable<any>;

  public constructor(
    private restService: RestService,
    private plantQuantityService: PlantQuantityService,
    private selectedPlantService: SelectedPlantService,
    private store: Store<fromRoot.State>
  ) {}

  public ngOnInit(): void {
    // this.plantType$ = this.store.pipe(select(fromRoot.getPlantType));
    // this.user$ = this.store.pipe(select(fromRoot.getUser));

    // this observable relaces two observable above
    this.pageData$ = this.store.pipe(select(fromRoot.getPlantListingData));

    this.plantListings$ = zip(
      this.restService.getPlantListings(),
      this.restService.getPlantQuantities()
    ) // faux http calls
      .pipe(
        map((response) => {
          const listings: PlantListing[] = response[0];
          const quantities: { plantId: number; quantity: number }[] =
            response[1];

          return this.plantQuantityService.mapQuantities(listings, quantities);
        })
      );
  }

  public selectPlant(selectedPlant: PlantListing): void {
    this.selectedPlantService.selectPlant(selectedPlant); // rxjs service
  }
}
