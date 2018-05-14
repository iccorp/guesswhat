import { BaseEntity } from './../../shared';

export class AttemptGw implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public isOk?: boolean,
        public challengeId?: number,
        public userId?: number,
    ) {
        this.isOk = false;
    }
}
