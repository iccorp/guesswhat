import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ChallengeGw } from './challenge-gw.model';
import { ChallengeGwService } from './challenge-gw.service';

@Component({
    selector: 'jhi-challenge-gw-detail',
    templateUrl: './challenge-gw-detail.component.html'
})
export class ChallengeGwDetailComponent implements OnInit, OnDestroy {

    challenge: ChallengeGw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private challengeService: ChallengeGwService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChallenges();
    }

    load(id) {
        this.challengeService.find(id).subscribe((challenge) => {
            this.challenge = challenge;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChallenges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'challengeListModification',
            (response) => this.load(this.challenge.id)
        );
    }
}
