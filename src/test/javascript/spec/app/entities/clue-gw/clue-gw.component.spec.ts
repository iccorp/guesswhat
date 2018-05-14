/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { ClueGwComponent } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.component';
import { ClueGwService } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.service';
import { ClueGw } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.model';

describe('Component Tests', () => {

    describe('ClueGw Management Component', () => {
        let comp: ClueGwComponent;
        let fixture: ComponentFixture<ClueGwComponent>;
        let service: ClueGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ClueGwComponent],
                providers: [
                    ClueGwService
                ]
            })
            .overrideTemplate(ClueGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClueGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClueGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ClueGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
