import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AwardGwComponent } from './award-gw.component';
import { AwardGwDetailComponent } from './award-gw-detail.component';
import { AwardGwPopupComponent } from './award-gw-dialog.component';
import { AwardGwDeletePopupComponent } from './award-gw-delete-dialog.component';

export const awardRoute: Routes = [
    {
        path: 'award-gw',
        component: AwardGwComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.award.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'award-gw/:id',
        component: AwardGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.award.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const awardPopupRoute: Routes = [
    {
        path: 'award-gw-new',
        component: AwardGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'award-gw/:id/edit',
        component: AwardGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'award-gw/:id/delete',
        component: AwardGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
