/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { AwardGwDialogComponent } from '../../../../../../main/webapp/app/entities/award-gw/award-gw-dialog.component';
import { AwardGwService } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.service';
import { AwardGw } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.model';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw';

describe('Component Tests', () => {

    describe('AwardGw Management Dialog Component', () => {
        let comp: AwardGwDialogComponent;
        let fixture: ComponentFixture<AwardGwDialogComponent>;
        let service: AwardGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AwardGwDialogComponent],
                providers: [
                    ChallengeGwService,
                    AwardGwService
                ]
            })
            .overrideTemplate(AwardGwDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardGwDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AwardGw(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.award = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'awardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AwardGw();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.award = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'awardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
