import { BaseEntity } from './../../shared';

export class ClueGw implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public isVisible?: boolean,
        public challengeId?: number,
    ) {
        this.isVisible = false;
    }
}
