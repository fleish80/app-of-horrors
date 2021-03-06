import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlantListing } from '../models/plant-listing';
import { PLANT_LISTINGS } from '../../../assets/db/plant-listings';
import { PLANT_QUANTITIES } from '../../../assets/db/plant-quantities';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    public getPlantListings(): Observable<PlantListing[]> {
        return of(PLANT_LISTINGS);
    }

    public getPlantQuantities(): Observable<any[]> {
        return of(PLANT_QUANTITIES);
    }
}
