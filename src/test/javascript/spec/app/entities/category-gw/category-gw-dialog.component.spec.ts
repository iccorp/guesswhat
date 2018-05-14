/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GuesswhatTestModule } from '../../../test.module';
import { CategoryGwDialogComponent } from '../../../../../../main/webapp/app/entities/category-gw/category-gw-dialog.component';
import { CategoryGwService } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.service';
import { CategoryGw } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.model';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw';

describe('Component Tests', () => {

    describe('CategoryGw Management Dialog Component', () => {
        let comp: CategoryGwDialogComponent;
        let fixture: ComponentFixture<CategoryGwDialogComponent>;
        let service: CategoryGwService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [CategoryGwDialogComponent],
                providers: [
                    ChallengeGwService,
                    CategoryGwService
                ]
            })
            .overrideTemplate(CategoryGwDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryGwDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryGwService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryGw(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryGw();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
