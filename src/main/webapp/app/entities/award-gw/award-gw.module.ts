import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import {
    AwardGwService,
    AwardGwPopupService,
    AwardGwComponent,
    AwardGwDetailComponent,
    AwardGwDialogComponent,
    AwardGwPopupComponent,
    AwardGwDeletePopupComponent,
    AwardGwDeleteDialogComponent,
    awardRoute,
    awardPopupRoute,
} from './';

const ENTITY_STATES = [
    ...awardRoute,
    ...awardPopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AwardGwComponent,
        AwardGwDetailComponent,
        AwardGwDialogComponent,
        AwardGwDeleteDialogComponent,
        AwardGwPopupComponent,
        AwardGwDeletePopupComponent,
    ],
    entryComponents: [
        AwardGwComponent,
        AwardGwDialogComponent,
        AwardGwPopupComponent,
        AwardGwDeleteDialogComponent,
        AwardGwDeletePopupComponent,
    ],
    providers: [
        AwardGwService,
        AwardGwPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatAwardGwModule {}
