import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClueGw } from './clue-gw.model';
import { ClueGwPopupService } from './clue-gw-popup.service';
import { ClueGwService } from './clue-gw.service';
import { ChallengeGw, ChallengeGwService } from '../challenge-gw';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-clue-gw-dialog',
    templateUrl: './clue-gw-dialog.component.html'
})
export class ClueGwDialogComponent implements OnInit {

    clue: ClueGw;
    isSaving: boolean;

    challenges: ChallengeGw[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clueService: ClueGwService,
        private challengeService: ChallengeGwService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.challengeService.query()
            .subscribe((res: ResponseWrapper) => { this.challenges = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clueService.update(this.clue));
        } else {
            this.subscribeToSaveResponse(
                this.clueService.create(this.clue));
        }
    }

    private subscribeToSaveResponse(result: Observable<ClueGw>) {
        result.subscribe((res: ClueGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ClueGw) {
        this.eventManager.broadcast({ name: 'clueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChallengeById(index: number, item: ChallengeGw) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-clue-gw-popup',
    template: ''
})
export class ClueGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cluePopupService: ClueGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cluePopupService
                    .open(ClueGwDialogComponent as Component, params['id']);
            } else {
                this.cluePopupService
                    .open(ClueGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
