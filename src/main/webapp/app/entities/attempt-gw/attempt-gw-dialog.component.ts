import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AttemptGw } from './attempt-gw.model';
import { AttemptGwPopupService } from './attempt-gw-popup.service';
import { AttemptGwService } from './attempt-gw.service';
import { ChallengeGw, ChallengeGwService } from '../challenge-gw';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-attempt-gw-dialog',
    templateUrl: './attempt-gw-dialog.component.html'
})
export class AttemptGwDialogComponent implements OnInit {

    attempt: AttemptGw;
    isSaving: boolean;

    challenges: ChallengeGw[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private attemptService: AttemptGwService,
        private challengeService: ChallengeGwService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.challengeService.query()
            .subscribe((res: ResponseWrapper) => { this.challenges = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.attempt.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attemptService.update(this.attempt));
        } else {
            this.subscribeToSaveResponse(
                this.attemptService.create(this.attempt));
        }
    }

    private subscribeToSaveResponse(result: Observable<AttemptGw>) {
        result.subscribe((res: AttemptGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AttemptGw) {
        this.eventManager.broadcast({ name: 'attemptListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-attempt-gw-popup',
    template: ''
})
export class AttemptGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attemptPopupService: AttemptGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.attemptPopupService
                    .open(AttemptGwDialogComponent as Component, params['id']);
            } else {
                this.attemptPopupService
                    .open(AttemptGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
