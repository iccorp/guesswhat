import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AttemptGw } from './attempt-gw.model';
import { AttemptGwService } from './attempt-gw.service';

@Component({
    selector: 'jhi-attempt-gw-detail',
    templateUrl: './attempt-gw-detail.component.html'
})
export class AttemptGwDetailComponent implements OnInit, OnDestroy {

    attempt: AttemptGw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private attemptService: AttemptGwService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttempts();
    }

    load(id) {
        this.attemptService.find(id).subscribe((attempt) => {
            this.attempt = attempt;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAttempts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'attemptListModification',
            (response) => this.load(this.attempt.id)
        );
    }
}
