/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { GuesswhatTestModule } from '../../../test.module';
import { CategoryGwComponent } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.component';
import { CategoryGwService } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.service';
import { CategoryGw } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.model';

describe('Component Tests', () => {

    describe('CategoryGw Management Component', () => {
        let comp: CategoryGwComponent;
        let fixture: ComponentFixture<CategoryGwComponent>;
        let service: CategoryGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [CategoryGwComponent],
                providers: [
                    CategoryGwService
                ]
            })
            .overrideTemplate(CategoryGwComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryGwComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CategoryGw(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
