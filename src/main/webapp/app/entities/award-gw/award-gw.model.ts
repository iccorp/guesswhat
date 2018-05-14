import { BaseEntity } from './../../shared';

export const enum AwardType {
    'TEXT',
    'IMAGE'
}

export class AwardGw implements BaseEntity {
    constructor(
        public id?: number,
        public type?: AwardType,
        public value?: string,
        public imageContentType?: string,
        public image?: any,
        public challengeId?: number,
    ) {
    }
}
