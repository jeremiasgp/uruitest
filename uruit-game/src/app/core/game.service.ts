import { Observable } from "rxjs/Observable";
import { IStatsInterface } from "./core.model";
import 'rxjs/add/observable/of';

export class GameService {

    getStats(): Observable<IStatsInterface[]> {
        const mockStats = [
            { player: 'Floor', score: '23' },
            { player: 'Mike', score: '21' },
            { player: 'Ian', score: '17' },
            { player: 'Aneke', score: '16' },
            { player: 'Angela', score: '13' },
            { player: 'Ronnie', score: '3' },
            { player: 'Rob', score: '0' },
        ];
        return Observable.of(mockStats);
    }
}
