import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import { GuesswhatAdminModule } from '../../admin/admin.module';
import {
    AttemptGwService,
    AttemptGwPopupService,
    AttemptGwComponent,
    AttemptGwDetailComponent,
    AttemptGwDialogComponent,
    AttemptGwPopupComponent,
    AttemptGwDeletePopupComponent,
    AttemptGwDeleteDialogComponent,
    attemptRoute,
    attemptPopupRoute,
} from './';

const ENTITY_STATES = [
    ...attemptRoute,
    ...attemptPopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        GuesswhatAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AttemptGwComponent,
        AttemptGwDetailComponent,
        AttemptGwDialogComponent,
        AttemptGwDeleteDialogComponent,
        AttemptGwPopupComponent,
        AttemptGwDeletePopupComponent,
    ],
    entryComponents: [
        AttemptGwComponent,
        AttemptGwDialogComponent,
        AttemptGwPopupComponent,
        AttemptGwDeleteDialogComponent,
        AttemptGwDeletePopupComponent,
    ],
    providers: [
        AttemptGwService,
        AttemptGwPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatAttemptGwModule {}
