import {Component, OnInit} from '@angular/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Router} from "@angular/router-deprecated";
import {Observable} from 'rxjs/Rx';
import {DescFilter} from "./pipes/descFilter.pipe";
import {CateFilter} from "./pipes/cateFilter.pipe";
import {GetdataService} from "./services/getdata.service";

@Component({
  selector: 'my-restau-list',
  templateUrl: 'templates/restauList.tpl.html',
  directives: [DROPDOWN_DIRECTIVES],
  pipes: [DescFilter, CateFilter]
})
export class RestauListComponent implements OnInit {
  restaurants: any = [];
  types: any = [];
  prices: any = [];
  priceMap: any = {'$': 'Low', '$$': 'Medium', '$$$': 'High', 'Prices': 'Prices'};
  ratings: any = [];

  nowType: any;
  nowPrice: any;
  nowRating: any;

  foodTypesStr: any;
  priceStr: any;
  ratingStr: any;

  constructor(private _getdataService: GetdataService, private _router:Router) {}

  ngOnInit(): any {
    this.types = new Set();
    this.ratings = new Set();
    // read datainfo json.
    this._getdataService.getRestauObservable()
      .subscribe(
        data => {
          this.restaurants = data;
          for(let i=0;i<data.length;i++) {
            this.ratings.add(+data[i].rating);
            for(let j=0;j<data[i].type.length;j++) {
                this.types.add(data[i].type[j]);
            }
            this.restaurants[i].emptyRatingArr=Array(+data[i].rating);
            this.restaurants[i].emptyReverseRatingArr=Array(5-data[i].rating);
          }
          this.types = Array.from(this.types);
          this.prices = ['$', '$$'];
          this.ratings = Array.from(this.ratings);
          this.ratings.sort();

          this.nowType='';
          this.nowPrice='';
          this.nowRating='';

          this.foodTypesStr='Food Types';
          this.priceStr='Prices';
          this.ratingStr='Ratings';

        },
        err => console.error(err)
      );
  }

  onFilterClick(whichType: string, target: string):any {
    if(whichType==='type') {
      this.nowType = target;
      if (target==='') {
          this.foodTypesStr='Food Types';
      } else {
        this.foodTypesStr = target;
      }
    }
    else if(whichType==='price') {
      this.nowPrice = target;
      if(target==='') {
        this.priceStr='Prices';
      } else {
        this.priceStr=target;
      }
    }
    else if(whichType==='rating') {
      this.nowRating=target;
      if(target==='') {
        this.ratingStr='Ratings';
      } else {
        this.ratingStr=target;
      }
    }
  }
  navigateTo(name: string, fName: string) {
    this._router.navigate(['RestauReview', {restau: name, fName: fName}]);
  }
}
