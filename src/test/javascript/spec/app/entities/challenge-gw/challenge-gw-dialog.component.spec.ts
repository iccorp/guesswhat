/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { ChallengeGwDialogComponent } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw-dialog.component';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.service';
import { ChallengeGw } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CategoryGwService } from '../../../../../../main/webapp/app/entities/category-gw';

describe('Component Tests', () => {

    describe('ChallengeGw Management Dialog Component', () => {
        let comp: ChallengeGwDialogComponent;
        let fixture: ComponentFixture<ChallengeGwDialogComponent>;
        let service: ChallengeGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ChallengeGwDialogComponent],
                providers: [
                    UserService,
                    CategoryGwService,
                    ChallengeGwService
                ]
            })
            .overrideTemplate(ChallengeGwDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChallengeGwDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChallengeGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChallengeGw(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.challenge = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'challengeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChallengeGw();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.challenge = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'challengeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
