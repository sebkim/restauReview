import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {RestauListComponent} from './restauList.component';
import {RestauReviewComponent} from './restauReview.component';

@Component({
  selector: 'my-app',
  // templateUrl: 'templates/app.tpl.html',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    {path: '/', name: 'RestauList', component: RestauListComponent, useAsDefault: true},
    {path: '/:restau', name: 'RestauReview', component: RestauReviewComponent}

])
export class AppComponent{

}
