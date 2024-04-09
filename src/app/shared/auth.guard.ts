import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

//  const authService = inject(AuthService);
  const router = inject(Router);

  return true;

  /*
  return authService.isAdmin()
    .then(admin => {
        if (admin) {
          console.log("GUARD: Navigation autorisée");
          return true;
        } else {
          console.log("GUARD: Navigation NON autorisée");
          router.navigate(['/home']);
          return false;
        }
      }
    );
  */
    
};
