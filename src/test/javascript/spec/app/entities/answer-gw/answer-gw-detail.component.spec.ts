/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { AnswerGwDetailComponent } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw-detail.component';
import { AnswerGwService } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.service';
import { AnswerGw } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.model';

describe('Component Tests', () => {

    describe('AnswerGw Management Detail Component', () => {
        let comp: AnswerGwDetailComponent;
        let fixture: ComponentFixture<AnswerGwDetailComponent>;
        let service: AnswerGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AnswerGwDetailComponent],
                providers: [
                    AnswerGwService
                ]
            })
            .overrideTemplate(AnswerGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AnswerGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.answer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
