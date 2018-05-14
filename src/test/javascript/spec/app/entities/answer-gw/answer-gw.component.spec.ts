/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { AnswerGwComponent } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.component';
import { AnswerGwService } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.service';
import { AnswerGw } from '../../../../../../main/webapp/app/entities/answer-gw/answer-gw.model';

describe('Component Tests', () => {

    describe('AnswerGw Management Component', () => {
        let comp: AnswerGwComponent;
        let fixture: ComponentFixture<AnswerGwComponent>;
        let service: AnswerGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AnswerGwComponent],
                providers: [
                    AnswerGwService
                ]
            })
            .overrideTemplate(AnswerGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnswerGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnswerGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AnswerGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.answers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
