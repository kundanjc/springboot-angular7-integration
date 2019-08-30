import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private routerService: RouterService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  /*    console.log('CanActivate')
      const token = this.authService.getBearerToken();
      console.log('CanActivate', token)
      if (!token) {
        this.routerService.routeToLogin();
        return false;
      }
      const mypromise = this.authService.isUserAuthenticated(token);
      return mypromise.then((validated: boolean) => {
        if (!validated) {
          this.routerService.routeToLogin();
        }
        return validated;
      }).catch(err => {
        this.routerService.routeToLogin();
        return false;
      });
  } */
  return true;
}

}