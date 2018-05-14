import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClueGw } from './clue-gw.model';
import { ClueGwPopupService } from './clue-gw-popup.service';
import { ClueGwService } from './clue-gw.service';

@Component({
    selector: 'jhi-clue-gw-delete-dialog',
    templateUrl: './clue-gw-delete-dialog.component.html'
})
export class ClueGwDeleteDialogComponent {

    clue: ClueGw;

    constructor(
        private clueService: ClueGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clueListModification',
                content: 'Deleted an clue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clue-gw-delete-popup',
    template: ''
})
export class ClueGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cluePopupService: ClueGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cluePopupService
                .open(ClueGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
