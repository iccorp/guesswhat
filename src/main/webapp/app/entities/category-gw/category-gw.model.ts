import { BaseEntity } from './../../shared';

export class CategoryGw implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public challenges?: BaseEntity[],
    ) {
    }
}
