import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import { GuesswhatAdminModule } from '../../admin/admin.module';
import {
    ChallengeGwService,
    ChallengeGwPopupService,
    ChallengeGwComponent,
    ChallengeGwDetailComponent,
    ChallengeGwDialogComponent,
    ChallengeGwPopupComponent,
    ChallengeGwDeletePopupComponent,
    ChallengeGwDeleteDialogComponent,
    challengeRoute,
    challengePopupRoute,
    ChallengeGwResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...challengeRoute,
    ...challengePopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        GuesswhatAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChallengeGwComponent,
        ChallengeGwDetailComponent,
        ChallengeGwDialogComponent,
        ChallengeGwDeleteDialogComponent,
        ChallengeGwPopupComponent,
        ChallengeGwDeletePopupComponent,
    ],
    entryComponents: [
        ChallengeGwComponent,
        ChallengeGwDialogComponent,
        ChallengeGwPopupComponent,
        ChallengeGwDeleteDialogComponent,
        ChallengeGwDeletePopupComponent,
    ],
    providers: [
        ChallengeGwService,
        ChallengeGwPopupService,
        ChallengeGwResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatChallengeGwModule {}
