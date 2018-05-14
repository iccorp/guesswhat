import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuesswhatSharedModule } from '../../shared';
import {
    CategoryGwService,
    CategoryGwPopupService,
    CategoryGwComponent,
    CategoryGwDetailComponent,
    CategoryGwDialogComponent,
    CategoryGwPopupComponent,
    CategoryGwDeletePopupComponent,
    CategoryGwDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        GuesswhatSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoryGwComponent,
        CategoryGwDetailComponent,
        CategoryGwDialogComponent,
        CategoryGwDeleteDialogComponent,
        CategoryGwPopupComponent,
        CategoryGwDeletePopupComponent,
    ],
    entryComponents: [
        CategoryGwComponent,
        CategoryGwDialogComponent,
        CategoryGwPopupComponent,
        CategoryGwDeleteDialogComponent,
        CategoryGwDeletePopupComponent,
    ],
    providers: [
        CategoryGwService,
        CategoryGwPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatCategoryGwModule {}
