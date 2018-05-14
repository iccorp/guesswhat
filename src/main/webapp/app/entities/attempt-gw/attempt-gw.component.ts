import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AttemptGw } from './attempt-gw.model';
import { AttemptGwService } from './attempt-gw.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-attempt-gw',
    templateUrl: './attempt-gw.component.html'
})
export class AttemptGwComponent implements OnInit, OnDestroy {
attempts: AttemptGw[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private attemptService: AttemptGwService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.attemptService.query().subscribe(
            (res: ResponseWrapper) => {
                this.attempts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAttempts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AttemptGw) {
        return item.id;
    }
    registerChangeInAttempts() {
        this.eventSubscriber = this.eventManager.subscribe('attemptListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
