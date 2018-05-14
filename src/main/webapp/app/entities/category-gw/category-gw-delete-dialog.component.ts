import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryGw } from './category-gw.model';
import { CategoryGwPopupService } from './category-gw-popup.service';
import { CategoryGwService } from './category-gw.service';

@Component({
    selector: 'jhi-category-gw-delete-dialog',
    templateUrl: './category-gw-delete-dialog.component.html'
})
export class CategoryGwDeleteDialogComponent {

    category: CategoryGw;

    constructor(
        private categoryService: CategoryGwService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-gw-delete-popup',
    template: ''
})
export class CategoryGwDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryGwPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryPopupService
                .open(CategoryGwDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
