/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { AnswerGwDialogComponent } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw-dialog.component';
import { AnswerGwService } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.service';
import { AnswerGw } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.model';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw';

describe('Component Tests', () => {

    describe('AnswerGw Management Dialog Component', () => {
        let comp: AnswerGwDialogComponent;
        let fixture: ComponentFixture<AnswerGwDialogComponent>;
        let service: AnswerGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AnswerGwDialogComponent],
                providers: [
                    ChallengeGwService,
                    AnswerGwService
                ]
            })
            .overrideTemplate(AnswerGwDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerGwDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AnswerGw(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.answer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'answerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AnswerGw();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.answer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'answerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
