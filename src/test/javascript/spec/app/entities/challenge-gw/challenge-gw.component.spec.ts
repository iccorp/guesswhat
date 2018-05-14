/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { ChallengeGwComponent } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.component';
import { ChallengeGwService } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.service';
import { ChallengeGw } from '../../../../../../main/webapp/app/entities/challenge-gw/challenge-gw.model';

describe('Component Tests', () => {

    describe('ChallengeGw Management Component', () => {
        let comp: ChallengeGwComponent;
        let fixture: ComponentFixture<ChallengeGwComponent>;
        let service: ChallengeGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ChallengeGwComponent],
                providers: [
                    ChallengeGwService
                ]
            })
            .overrideTemplate(ChallengeGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChallengeGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChallengeGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ChallengeGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.challenges[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
