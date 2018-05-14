/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { AttemptGwDetailComponent } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw-detail.component';
import { AttemptGwService } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw.service';
import { AttemptGw } from '../../../../../../main/webapp/app/entities/attempt-gw/attempt-gw.model';

describe('Component Tests', () => {

    describe('AttemptGw Management Detail Component', () => {
        let comp: AttemptGwDetailComponent;
        let fixture: ComponentFixture<AttemptGwDetailComponent>;
        let service: AttemptGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AttemptGwDetailComponent],
                providers: [
                    AttemptGwService
                ]
            })
            .overrideTemplate(AttemptGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttemptGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttemptGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AttemptGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.attempt).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
