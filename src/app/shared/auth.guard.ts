import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router) { }
        private user
    canActivate(): Observable<boolean> {
        return this.authService.getAuthState().map(
            (user) => {
                this.user = user;
                if (this.user) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                }
                return false;
            });
            
    }
}   