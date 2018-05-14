import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnswerGw } from './answer-gw.model';
import { AnswerGwPopupService } from './answer-gw-popup.service';
import { AnswerGwService } from './answer-gw.service';

@Component({
    selector: 'jhi-answer-gw-delete-dialog',
    templateUrl: './answer-gw-delete-dialog.component.html'
})
export class AnswerGwDeleteDialogComponent {

    answer: AnswerGw;

    constructor(
        private answerService: AnswerGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.answerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'answerListModification',
                content: 'Deleted an answer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-answer-gw-delete-popup',
    template: ''
})
export class AnswerGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.answerPopupService
                .open(AnswerGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
