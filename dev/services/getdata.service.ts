import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetdataService {
  restauJson: any;

  constructor(private _http: Http) {

  }

  getRestauObservable() {
    // read datainfo json.
    return this._http.get('json/restaurants.json')
      .map((res:Response) => res.json());
  }

  saveRestauData(data: any) {
    this.restauJson = data;
  }

  getRestauData() {
    return this.restauJson;
  }

  getReviewObservable(fName: string) {
    return this._http.get('json/'+ fName)
    .map((res:Response) => res.json());
  }


}
