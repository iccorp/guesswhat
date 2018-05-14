import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import {
    ClueGwService,
    ClueGwPopupService,
    ClueGwComponent,
    ClueGwDetailComponent,
    ClueGwDialogComponent,
    ClueGwPopupComponent,
    ClueGwDeletePopupComponent,
    ClueGwDeleteDialogComponent,
    clueRoute,
    cluePopupRoute,
} from './';

const ENTITY_STATES = [
    ...clueRoute,
    ...cluePopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClueGwComponent,
        ClueGwDetailComponent,
        ClueGwDialogComponent,
        ClueGwDeleteDialogComponent,
        ClueGwPopupComponent,
        ClueGwDeletePopupComponent,
    ],
    entryComponents: [
        ClueGwComponent,
        ClueGwDialogComponent,
        ClueGwPopupComponent,
        ClueGwDeleteDialogComponent,
        ClueGwDeletePopupComponent,
    ],
    providers: [
        ClueGwService,
        ClueGwPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatClueGwModule {}
