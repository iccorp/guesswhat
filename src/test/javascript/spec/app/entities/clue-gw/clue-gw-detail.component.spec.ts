/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { ClueGwDetailComponent } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw-detail.component';
import { ClueGwService } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.service';
import { ClueGw } from '../../../../../../main/webapp/app/entities/clue-gw/clue-gw.model';

describe('Component Tests', () => {

    describe('ClueGw Management Detail Component', () => {
        let comp: ClueGwDetailComponent;
        let fixture: ComponentFixture<ClueGwDetailComponent>;
        let service: ClueGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [ClueGwDetailComponent],
                providers: [
                    ClueGwService
                ]
            })
            .overrideTemplate(ClueGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClueGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClueGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ClueGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clue).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
