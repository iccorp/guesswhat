import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnswerGw } from './answer-gw.model';
import { AnswerGwService } from './answer-gw.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-answer-gw',
    templateUrl: './answer-gw.component.html'
})
export class AnswerGwComponent implements OnInit, OnDestroy {
answers: AnswerGw[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private answerService: AnswerGwService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.answerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.answers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnswers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AnswerGw) {
        return item.id;
    }
    registerChangeInAnswers() {
        this.eventSubscriber = this.eventManager.subscribe('answerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
