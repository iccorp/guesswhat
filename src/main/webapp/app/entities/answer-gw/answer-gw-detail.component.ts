import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AnswerGw } from './answer-gw.model';
import { AnswerGwService } from './answer-gw.service';

@Component({
    selector: 'jhi-answer-gw-detail',
    templateUrl: './answer-gw-detail.component.html'
})
export class AnswerGwDetailComponent implements OnInit, OnDestroy {

    answer: AnswerGw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private answerService: AnswerGwService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnswers();
    }

    load(id) {
        this.answerService.find(id).subscribe((answer) => {
            this.answer = answer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnswers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'answerListModification',
            (response) => this.load(this.answer.id)
        );
    }
}
