/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GuesswhatTestModule } from '../../../test.module';
import { CategoryGwDetailComponent } from '../../../../../../main/webapp/app/entities/category-gw/category-gw-detail.component';
import { CategoryGwService } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.service';
import { CategoryGw } from '../../../../../../main/webapp/app/entities/category-gw/category-gw.model';

describe('Component Tests', () => {

    describe('CategoryGw Management Detail Component', () => {
        let comp: CategoryGwDetailComponent;
        let fixture: ComponentFixture<CategoryGwDetailComponent>;
        let service: CategoryGwService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GuesswhatTestModule],
                declarations: [CategoryGwDetailComponent],
                providers: [
                    CategoryGwService
                ]
            })
            .overrideTemplate(CategoryGwDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryGwDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryGwService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CategoryGw(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.category).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
