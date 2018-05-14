import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AttemptGwComponent } from './attempt-gw.component';
import { AttemptGwDetailComponent } from './attempt-gw-detail.component';
import { AttemptGwPopupComponent } from './attempt-gw-dialog.component';
import { AttemptGwDeletePopupComponent } from './attempt-gw-delete-dialog.component';

export const attemptRoute: Routes = [
    {
        path: 'attempt-gw',
        component: AttemptGwComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.attempt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'attempt-gw/:id',
        component: AttemptGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.attempt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attemptPopupRoute: Routes = [
    {
        path: 'attempt-gw-new',
        component: AttemptGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.attempt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attempt-gw/:id/edit',
        component: AttemptGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.attempt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attempt-gw/:id/delete',
        component: AttemptGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.attempt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
