import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AwardGw } from './award-gw.model';
import { AwardGwPopupService } from './award-gw-popup.service';
import { AwardGwService } from './award-gw.service';
import { ChallengeGw, ChallengeGwService } from '../challenge-gw';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-award-gw-dialog',
    templateUrl: './award-gw-dialog.component.html'
})
export class AwardGwDialogComponent implements OnInit {

    award: AwardGw;
    isSaving: boolean;

    challenges: ChallengeGw[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private awardService: AwardGwService,
        private challengeService: ChallengeGwService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.challengeService.query()
            .subscribe((res: ResponseWrapper) => { this.challenges = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.award, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.award.id !== undefined) {
            this.subscribeToSaveResponse(
                this.awardService.update(this.award));
        } else {
            this.subscribeToSaveResponse(
                this.awardService.create(this.award));
        }
    }

    private subscribeToSaveResponse(result: Observable<AwardGw>) {
        result.subscribe((res: AwardGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AwardGw) {
        this.eventManager.broadcast({ name: 'awardListModification', content: 'OK'});
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
    selector: 'jhi-award-gw-popup',
    template: ''
})
export class AwardGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private awardPopupService: AwardGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.awardPopupService
                    .open(AwardGwDialogComponent as Component, params['id']);
            } else {
                this.awardPopupService
                    .open(AwardGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
