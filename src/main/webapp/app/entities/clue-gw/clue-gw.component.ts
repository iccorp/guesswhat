import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClueGw } from './clue-gw.model';
import { ClueGwService } from './clue-gw.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-clue-gw',
    templateUrl: './clue-gw.component.html'
})
export class ClueGwComponent implements OnInit, OnDestroy {
clues: ClueGw[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clueService: ClueGwService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clueService.query().subscribe(
            (res: ResponseWrapper) => {
                this.clues = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClueGw) {
        return item.id;
    }
    registerChangeInClues() {
        this.eventSubscriber = this.eventManager.subscribe('clueListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
