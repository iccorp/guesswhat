import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClueGwComponent } from './clue-gw.component';
import { ClueGwDetailComponent } from './clue-gw-detail.component';
import { ClueGwPopupComponent } from './clue-gw-dialog.component';
import { ClueGwDeletePopupComponent } from './clue-gw-delete-dialog.component';

export const clueRoute: Routes = [
    {
        path: 'clue-gw',
        component: ClueGwComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.clue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'clue-gw/:id',
        component: ClueGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.clue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cluePopupRoute: Routes = [
    {
        path: 'clue-gw-new',
        component: ClueGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.clue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clue-gw/:id/edit',
        component: ClueGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.clue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clue-gw/:id/delete',
        component: ClueGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.clue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
