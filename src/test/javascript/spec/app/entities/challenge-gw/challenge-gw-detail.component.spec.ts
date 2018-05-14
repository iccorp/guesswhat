/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { ChallengeGwDetailComponent } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw-detail.component';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.service';
import { ChallengeGw } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.model';

describe('Component Tests', () => {

    describe('ChallengeGw Management Detail Component', () => {
        let comp: ChallengeGwDetailComponent;
        let fixture: ComponentFixture<ChallengeGwDetailComponent>;
        let service: ChallengeGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ChallengeGwDetailComponent],
                providers: [
                    ChallengeGwService
                ]
            })
            .overrideTemplate(ChallengeGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChallengeGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChallengeGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ChallengeGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.challenge).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
