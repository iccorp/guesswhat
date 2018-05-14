/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { AnswerGwDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw-delete-dialog.component';
import { AnswerGwService } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.service';

describe('Component Tests', () => {

    describe('AnswerGw Management Delete Component', () => {
        let comp: AnswerGwDeleteDialogComponent;
        let fixture: ComponentFixture<AnswerGwDeleteDialogComponent>;
        let service: AnswerGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AnswerGwDeleteDialogComponent],
                providers: [
                    AnswerGwService
                ]
            })
            .overrideTemplate(AnswerGwDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerGwDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerGwService);
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
