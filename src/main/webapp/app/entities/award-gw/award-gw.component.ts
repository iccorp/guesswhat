import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AwardGw } from './award-gw.model';
import { AwardGwService } from './award-gw.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-award-gw',
    templateUrl: './award-gw.component.html'
})
export class AwardGwComponent implements OnInit, OnDestroy {
awards: AwardGw[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private awardService: AwardGwService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.awardService.query().subscribe(
            (res: ResponseWrapper) => {
                this.awards = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAwards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AwardGw) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInAwards() {
        this.eventSubscriber = this.eventManager.subscribe('awardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
