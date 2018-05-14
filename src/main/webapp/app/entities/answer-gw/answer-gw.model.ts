import { BaseEntity } from './../../shared';

export class AnswerGw implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public challengeId?: number,
    ) {
    }
}
