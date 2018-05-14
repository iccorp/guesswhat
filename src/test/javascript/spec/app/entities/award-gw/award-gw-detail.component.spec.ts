/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { AwardGwDetailComponent } from '../../../../../../main/webapp/app/entities/award-gw/award-gw-detail.component';
import { AwardGwService } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.service';
import { AwardGw } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.model';

describe('Component Tests', () => {

    describe('AwardGw Management Detail Component', () => {
        let comp: AwardGwDetailComponent;
        let fixture: ComponentFixture<AwardGwDetailComponent>;
        let service: AwardGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AwardGwDetailComponent],
                providers: [
                    AwardGwService
                ]
            })
            .overrideTemplate(AwardGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AwardGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.award).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
