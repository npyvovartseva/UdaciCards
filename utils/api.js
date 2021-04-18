import AsyncStorage from '@react-native-async-storage/async-storage';
import {_saveDeck, _addCardToDeck} from './helpers';

export async function saveDeck(title) {
    const deck = _saveDeck(title);
    await AsyncStorage.setItem('decks', JSON.stringify({ [deck.id]: deck }));
    return deck.id;
}

export async function getDeck(id) {
    const data = JSON.parse(await AsyncStorage.getItem('decks'));
    return data[id];
}

export async function getDecks() {
    const decks = JSON.parse(await AsyncStorage.getItem('decks'));
    return decks? decks: [];
}

export async function addCardToDeck(id, card) {
    const results = await AsyncStorage.getItem('decks');
    const data = JSON.parse(results);
    data[id].cards.push(_addCardToDeck(card));
    return await AsyncStorage.setItem('decks', JSON.stringify(data));
}