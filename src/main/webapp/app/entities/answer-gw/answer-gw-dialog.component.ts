import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AnswerGw } from './answer-gw.model';
import { AnswerGwPopupService } from './answer-gw-popup.service';
import { AnswerGwService } from './answer-gw.service';
import { ChallengeGw, ChallengeGwService } from '../challenge-gw';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-answer-gw-dialog',
    templateUrl: './answer-gw-dialog.component.html'
})
export class AnswerGwDialogComponent implements OnInit {

    answer: AnswerGw;
    isSaving: boolean;

    challenges: ChallengeGw[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private answerService: AnswerGwService,
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
        if (this.answer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.answerService.update(this.answer));
        } else {
            this.subscribeToSaveResponse(
                this.answerService.create(this.answer));
        }
    }

    private subscribeToSaveResponse(result: Observable<AnswerGw>) {
        result.subscribe((res: AnswerGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AnswerGw) {
        this.eventManager.broadcast({ name: 'answerListModification', content: 'OK'});
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
    selector: 'jhi-answer-gw-popup',
    template: ''
})
export class AnswerGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.answerPopupService
                    .open(AnswerGwDialogComponent as Component, params['id']);
            } else {
                this.answerPopupService
                    .open(AnswerGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
