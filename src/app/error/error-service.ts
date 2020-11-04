import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentification/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.tokenStorageService.getUser()) {
      if (this.tokenStorageService.getUser().roles[0] == 'ROLE_ADMIN' || state.url == '/meeting/list' || state.url == '/profile') {
        return true;
      } else {
        return this.router.createUrlTree(['/access-denied']);
      }
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }

}