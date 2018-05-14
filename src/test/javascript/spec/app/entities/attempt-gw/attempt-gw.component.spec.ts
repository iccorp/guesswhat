/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { AttemptGwComponent } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw.component';
import { AttemptGwService } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw.service';
import { AttemptGw } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw.model';

describe('Component Tests', () => {

    describe('AttemptGw Management Component', () => {
        let comp: AttemptGwComponent;
        let fixture: ComponentFixture<AttemptGwComponent>;
        let service: AttemptGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AttemptGwComponent],
                providers: [
                    AttemptGwService
                ]
            })
            .overrideTemplate(AttemptGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttemptGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttemptGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AttemptGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.attempts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
