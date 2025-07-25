import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { OpenFoodFactRequest } from "../models/product";

@Injectable({ providedIn: 'root' })
export class FoodService {

    private readonly httpClient = inject(HttpClient);

    getByCodebar(codeBar: string) {
        return this.httpClient.get<OpenFoodFactRequest>(
            'https://world.openfoodfacts.org/api/v2/product/'+ codeBar +'.json'
        )
    }
}