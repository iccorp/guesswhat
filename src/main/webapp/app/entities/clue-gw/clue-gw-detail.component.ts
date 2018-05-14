import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ClueGw } from './clue-gw.model';
import { ClueGwService } from './clue-gw.service';

@Component({
    selector: 'jhi-clue-gw-detail',
    templateUrl: './clue-gw-detail.component.html'
})
export class ClueGwDetailComponent implements OnInit, OnDestroy {

    clue: ClueGw;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clueService: ClueGwService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClues();
    }

    load(id) {
        this.clueService.find(id).subscribe((clue) => {
            this.clue = clue;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clueListModification',
            (response) => this.load(this.clue.id)
        );
    }
}
