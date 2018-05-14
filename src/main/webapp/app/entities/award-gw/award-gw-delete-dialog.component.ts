import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AwardGw } from './award-gw.model';
import { AwardGwPopupService } from './award-gw-popup.service';
import { AwardGwService } from './award-gw.service';

@Component({
    selector: 'jhi-award-gw-delete-dialog',
    templateUrl: './award-gw-delete-dialog.component.html'
})
export class AwardGwDeleteDialogComponent {

    award: AwardGw;

    constructor(
        private awardService: AwardGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.awardService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'awardListModification',
                content: 'Deleted an award'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-award-gw-delete-popup',
    template: ''
})
export class AwardGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private awardPopupService: AwardGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.awardPopupService
                .open(AwardGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
