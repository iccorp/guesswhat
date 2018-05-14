import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChallengeGw } from './challenge-gw.model';
import { ChallengeGwPopupService } from './challenge-gw-popup.service';
import { ChallengeGwService } from './challenge-gw.service';
import { User, UserService } from '../../shared';
import { CategoryGw, CategoryGwService } from '../category-gw';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-challenge-gw-dialog',
    templateUrl: './challenge-gw-dialog.component.html'
})
export class ChallengeGwDialogComponent implements OnInit {

    challenge: ChallengeGw;
    isSaving: boolean;

    users: User[];

    categories: CategoryGw[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private challengeService: ChallengeGwService,
        private userService: UserService,
        private categoryService: CategoryGwService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.challenge.id !== undefined) {
            this.subscribeToSaveResponse(
                this.challengeService.update(this.challenge));
        } else {
            this.subscribeToSaveResponse(
                this.challengeService.create(this.challenge));
        }
    }

    private subscribeToSaveResponse(result: Observable<ChallengeGw>) {
        result.subscribe((res: ChallengeGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ChallengeGw) {
        this.eventManager.broadcast({ name: 'challengeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCategoryById(index: number, item: CategoryGw) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-challenge-gw-popup',
    template: ''
})
export class ChallengeGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private challengePopupService: ChallengeGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.challengePopupService
                    .open(ChallengeGwDialogComponent as Component, params['id']);
            } else {
                this.challengePopupService
                    .open(ChallengeGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
