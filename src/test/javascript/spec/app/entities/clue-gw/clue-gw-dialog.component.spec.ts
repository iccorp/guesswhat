/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { ClueGwDialogComponent } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw-dialog.component';
import { ClueGwService } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.service';
import { ClueGw } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.model';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw';

describe('Component Tests', () => {

    describe('ClueGw Management Dialog Component', () => {
        let comp: ClueGwDialogComponent;
        let fixture: ComponentFixture<ClueGwDialogComponent>;
        let service: ClueGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ClueGwDialogComponent],
                providers: [
                    ChallengeGwService,
                    ClueGwService
                ]
            })
            .overrideTemplate(ClueGwDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClueGwDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClueGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClueGw(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.clue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClueGw();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.clue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
