import {Component, OnInit} from "@angular/core";
import {RouteParams, Router} from "@angular/router-deprecated";
import {GetdataService} from "./services/getdata.service";

@Component({
    selector: 'my-restau-review',
    templateUrl: 'templates/restauReview.tpl.html'
})
export class RestauReviewComponent implements OnInit {

    priceMap: any = {'$': 'Low', '$$': 'Medium', '$$$': 'High', 'Prices': 'Prices'};

    restau: string;
    fName: string;
    restauJsonList: any;
    hereRestauJson: any;
    reviews: any;

    address: any;
    phone: any;
    hours: any;
    price: any;
    desc: any;
    rating: any;
    emptyRatingArr: any;
    emptyReverseRatingArr: any;

    dayNames = ['Sunyday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    constructor(private _getdataService: GetdataService, private _routeParams: RouteParams, private _router:Router) {}

    ngOnInit():any {
        this.restau = this._routeParams.get('restau');
        this.fName = this._routeParams.get('fName');
        this._getdataService.getRestauObservable()
        .subscribe(
          data => {
            this.restauJsonList = data;
            for(let i=0;i<this.restauJsonList.length;i++) {
              if (this.restauJsonList[i].name===this.restau) {
                this.hereRestauJson = this.restauJsonList[i];
                this.address = this.hereRestauJson.address;
                this.phone = this.hereRestauJson.phone;
                this.hours = this.hereRestauJson.hours;
                this.price = this.hereRestauJson.price;
                this.desc = this.hereRestauJson.description;
                this.rating = this.hereRestauJson.rating;
                this.emptyRatingArr = Array(+this.rating);
                this.emptyReverseRatingArr = Array(5-this.rating);
                break;
              }
            }
            if(this.fName==null) {

            } else {
              this._getdataService.getReviewObservable(this.fName)
              .subscribe(
                data => {
                  this.reviews = data;
                  for(let i=0;i<this.reviews.length;i++) {
                    this.reviews[i].emptyRatingArr=Array(+this.reviews[i].stars);
                    this.reviews[i].emptyReverseRatingArr=Array(5-this.reviews[i].stars);
                  }
                },
                err => console.error(err)
              );
            }
          },
          err => console.error(err)
        );
    }

    writeReview(content: string, rating: string, name: string) {
      let hereReview={};
      if(name==='') {
        hereReview.reviewer="Someone";
      } else {
        hereReview.reviewer=name;
      }
      hereReview.stars = rating;
      hereReview.date="";
      hereReview.comments=content;

      hereReview.emptyRatingArr=Array(+rating);
      hereReview.emptyReverseRatingArr=Array(5-rating);

      this.reviews.push(hereReview);

    }

    navigateBack() {
      this._router.navigate(['RestauList']);
    }

}
