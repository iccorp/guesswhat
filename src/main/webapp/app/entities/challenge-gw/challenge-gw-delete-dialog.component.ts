import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChallengeGw } from './challenge-gw.model';
import { ChallengeGwPopupService } from './challenge-gw-popup.service';
import { ChallengeGwService } from './challenge-gw.service';

@Component({
    selector: 'jhi-challenge-gw-delete-dialog',
    templateUrl: './challenge-gw-delete-dialog.component.html'
})
export class ChallengeGwDeleteDialogComponent {

    challenge: ChallengeGw;

    constructor(
        private challengeService: ChallengeGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.challengeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'challengeListModification',
                content: 'Deleted an challenge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-challenge-gw-delete-popup',
    template: ''
})
export class ChallengeGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private challengePopupService: ChallengeGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.challengePopupService
                .open(ChallengeGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
