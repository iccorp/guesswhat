import { BaseEntity } from './../../shared';

export class ChallengeGw implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public question?: string,
        public userId?: number,
        public categories?: BaseEntity[],
    ) {
    }
}
