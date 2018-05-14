/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { AwardGwDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/award-gw/award-gw-delete-dialog.component';
import { AwardGwService } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.service';

describe('Component Tests', () => {

    describe('AwardGw Management Delete Component', () => {
        let comp: AwardGwDeleteDialogComponent;
        let fixture: ComponentFixture<AwardGwDeleteDialogComponent>;
        let service: AwardGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AwardGwDeleteDialogComponent],
                providers: [
                    AwardGwService
                ]
            })
            .overrideTemplate(AwardGwDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardGwDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
