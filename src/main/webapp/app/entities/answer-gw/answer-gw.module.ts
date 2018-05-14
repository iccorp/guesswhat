import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import {
    AnswerGwService,
    AnswerGwPopupService,
    AnswerGwComponent,
    AnswerGwDetailComponent,
    AnswerGwDialogComponent,
    AnswerGwPopupComponent,
    AnswerGwDeletePopupComponent,
    AnswerGwDeleteDialogComponent,
    answerRoute,
    answerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...answerRoute,
    ...answerPopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnswerGwComponent,
        AnswerGwDetailComponent,
        AnswerGwDialogComponent,
        AnswerGwDeleteDialogComponent,
        AnswerGwPopupComponent,
        AnswerGwDeletePopupComponent,
    ],
    entryComponents: [
        AnswerGwComponent,
        AnswerGwDialogComponent,
        AnswerGwPopupComponent,
        AnswerGwDeleteDialogComponent,
        AnswerGwDeletePopupComponent,
    ],
    providers: [
        AnswerGwService,
        AnswerGwPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatAnswerGwModule {}
