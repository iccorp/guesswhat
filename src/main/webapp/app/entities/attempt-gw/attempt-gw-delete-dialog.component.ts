import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AttemptGw } from './attempt-gw.model';
import { AttemptGwPopupService } from './attempt-gw-popup.service';
import { AttemptGwService } from './attempt-gw.service';

@Component({
    selector: 'jhi-attempt-gw-delete-dialog',
    templateUrl: './attempt-gw-delete-dialog.component.html'
})
export class AttemptGwDeleteDialogComponent {

    attempt: AttemptGw;

    constructor(
        private attemptService: AttemptGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attemptService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'attemptListModification',
                content: 'Deleted an attempt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attempt-gw-delete-popup',
    template: ''
})
export class AttemptGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attemptPopupService: AttemptGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.attemptPopupService
                .open(AttemptGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
