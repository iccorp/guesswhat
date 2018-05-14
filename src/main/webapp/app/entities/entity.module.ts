import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GuesswhatChallengeGwModule } from './challenge-gw/challenge-gw.module';
import { GuesswhatCategoryGwModule } from './category-gw/category-gw.module';
import { GuesswhatClueGwModule } from './clue-gw/clue-gw.module';
import { GuesswhatAnswerGwModule } from './answer-gw/answer-gw.module';
import { GuesswhatAttemptGwModule } from './attempt-gw/attempt-gw.module';
import { GuesswhatAwardGwModule } from './award-gw/award-gw.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GuesswhatChallengeGwModule,
        GuesswhatCategoryGwModule,
        GuesswhatClueGwModule,
        GuesswhatAnswerGwModule,
        GuesswhatAttemptGwModule,
        GuesswhatAwardGwModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuesswhatEntityModule {}
