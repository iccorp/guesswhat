import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryGwComponent } from './category-gw.component';
import { CategoryGwDetailComponent } from './category-gw-detail.component';
import { CategoryGwPopupComponent } from './category-gw-dialog.component';
import { CategoryGwDeletePopupComponent } from './category-gw-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-gw',
        component: CategoryGwComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-gw/:id',
        component: CategoryGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-gw-new',
        component: CategoryGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-gw/:id/edit',
        component: CategoryGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-gw/:id/delete',
        component: CategoryGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
