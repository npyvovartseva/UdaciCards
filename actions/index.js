import { saveDeck, addCardToDeck, getDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function _addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}
export function addDeck(deck, callback) {
    return (dispatch) => {
        saveDeck(deck)
            .then((id) => {
                getDeck(id)
                    .then(result=>{
                    dispatch(_addDeck(result));
                })
                .then(()=>{callback(id)})
            })
    }
}


export function addCard(id, card) {
    return {
        type: ADD_CARD,
        deckId: id,
        card
    }
}