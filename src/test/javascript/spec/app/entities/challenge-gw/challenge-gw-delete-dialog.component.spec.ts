/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { ChallengeGwDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw-delete-dialog.component';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.service';

describe('Component Tests', () => {

    describe('ChallengeGw Management Delete Component', () => {
        let comp: ChallengeGwDeleteDialogComponent;
        let fixture: ComponentFixture<ChallengeGwDeleteDialogComponent>;
        let service: ChallengeGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ChallengeGwDeleteDialogComponent],
                providers: [
                    ChallengeGwService
                ]
            })
            .overrideTemplate(ChallengeGwDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChallengeGwDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChallengeGwService);
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
