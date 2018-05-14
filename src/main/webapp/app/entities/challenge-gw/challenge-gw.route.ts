import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChallengeGwComponent } from './challenge-gw.component';
import { ChallengeGwDetailComponent } from './challenge-gw-detail.component';
import { ChallengeGwPopupComponent } from './challenge-gw-dialog.component';
import { ChallengeGwDeletePopupComponent } from './challenge-gw-delete-dialog.component';

@Injectable()
export class ChallengeGwResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const challengeRoute: Routes = [
    {
        path: 'challenge-gw',
        component: ChallengeGwComponent,
        resolve: {
            'pagingParams': ChallengeGwResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.challenge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'challenge-gw/:id',
        component: ChallengeGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.challenge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const challengePopupRoute: Routes = [
    {
        path: 'challenge-gw-new',
        component: ChallengeGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.challenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'challenge-gw/:id/edit',
        component: ChallengeGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.challenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'challenge-gw/:id/delete',
        component: ChallengeGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.challenge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
