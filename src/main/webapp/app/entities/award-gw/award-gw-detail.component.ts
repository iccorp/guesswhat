import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AwardGw } from './award-gw.model';
import { AwardGwService } from './award-gw.service';

@Component({
    selector: 'jhi-award-gw-detail',
    templateUrl: './award-gw-detail.component.html'
})
export class AwardGwDetailComponent implements OnInit, OnDestroy {

    award: AwardGw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private awardService: AwardGwService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAwards();
    }

    load(id) {
        this.awardService.find(id).subscribe((award) => {
            this.award = award;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAwards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'awardListModification',
            (response) => this.load(this.award.id)
        );
    }
}
