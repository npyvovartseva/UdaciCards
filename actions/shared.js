import { getDecks } from '../utils/api';
import { receiveDecks } from './index';

export function handelInitialData() {
    return (dispatch) => {
        getDecks()
            .then(({ decks }) => {
                dispatch(receiveDecks(decks));
            })
    }
}