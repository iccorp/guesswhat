import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { AttemptGw } from './attempt-gw.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AttemptGwService {

    private resourceUrl = SERVER_API_URL + 'api/attempts';

    constructor(private http: Http) { }

    create(attempt: AttemptGw): Observable<AttemptGw> {
        const copy = this.convert(attempt);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(attempt: AttemptGw): Observable<AttemptGw> {
        const copy = this.convert(attempt);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AttemptGw> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to AttemptGw.
     */
    private convertItemFromServer(json: any): AttemptGw {
        const entity: AttemptGw = Object.assign(new AttemptGw(), json);
        return entity;
    }

    /**
     * Convert a AttemptGw to a JSON which can be sent to the server.
     */
    private convert(attempt: AttemptGw): AttemptGw {
        const copy: AttemptGw = Object.assign({}, attempt);
        return copy;
    }
}
