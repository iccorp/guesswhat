/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { AwardGwComponent } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.component';
import { AwardGwService } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.service';
import { AwardGw } from '../../../../../../main/webapp/app/entities/award-gw/award-gw.model';

describe('Component Tests', () => {

    describe('AwardGw Management Component', () => {
        let comp: AwardGwComponent;
        let fixture: ComponentFixture<AwardGwComponent>;
        let service: AwardGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [AwardGwComponent],
                providers: [
                    AwardGwService
                ]
            })
            .overrideTemplate(AwardGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AwardGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AwardGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AwardGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.awards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
