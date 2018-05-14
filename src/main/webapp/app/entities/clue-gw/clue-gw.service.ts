import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ClueGw } from './clue-gw.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClueGwService {

    private resourceUrl = SERVER_API_URL + 'api/clues';

    constructor(private http: Http) { }

    create(clue: ClueGw): Observable<ClueGw> {
        const copy = this.convert(clue);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(clue: ClueGw): Observable<ClueGw> {
        const copy = this.convert(clue);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ClueGw> {
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
     * Convert a returned JSON object to ClueGw.
     */
    private convertItemFromServer(json: any): ClueGw {
        const entity: ClueGw = Object.assign(new ClueGw(), json);
        return entity;
    }

    /**
     * Convert a ClueGw to a JSON which can be sent to the server.
     */
    private convert(clue: ClueGw): ClueGw {
        const copy: ClueGw = Object.assign({}, clue);
        return copy;
    }
}
