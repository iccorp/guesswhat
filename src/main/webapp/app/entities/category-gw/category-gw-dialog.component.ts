import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CategoryGw } from './category-gw.model';
import { CategoryGwPopupService } from './category-gw-popup.service';
import { CategoryGwService } from './category-gw.service';
import { ChallengeGw, ChallengeGwService } from '../challenge-gw';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-category-gw-dialog',
    templateUrl: './category-gw-dialog.component.html'
})
export class CategoryGwDialogComponent implements OnInit {

    category: CategoryGw;
    isSaving: boolean;

    challenges: ChallengeGw[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryGwService,
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
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(
                this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<CategoryGw>) {
        result.subscribe((res: CategoryGw) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoryGw) {
        this.eventManager.broadcast({ name: 'categoryListModification', content: 'OK'});
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
    selector: 'jhi-category-gw-popup',
    template: ''
})
export class CategoryGwPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryPopupService
                    .open(CategoryGwDialogComponent as Component, params['id']);
            } else {
                this.categoryPopupService
                    .open(CategoryGwDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
