import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AnswerGwComponent } from './answer-gw.component';
import { AnswerGwDetailComponent } from './answer-gw-detail.component';
import { AnswerGwPopupComponent } from './answer-gw-dialog.component';
import { AnswerGwDeletePopupComponent } from './answer-gw-delete-dialog.component';

export const answerRoute: Routes = [
    {
        path: 'answer-gw',
        component: AnswerGwComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'answer-gw/:id',
        component: AnswerGwDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'answer-gw-new',
        component: AnswerGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer-gw/:id/edit',
        component: AnswerGwPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'answer-gw/:id/delete',
        component: AnswerGwDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'guesswhatApp.answer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
