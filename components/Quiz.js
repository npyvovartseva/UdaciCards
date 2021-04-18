import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { ProgressBar, Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FlashCard from './FlashCard';
import QuizResults from './QuizResults';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';


export class Quiz extends Component {

    state = {
        correctAnswers: 0,
        cardsAnswered: 0
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => { this.props.navigation.navigate('DeckFront', { id: this.props.id }) }}>
                    <MaterialCommunityIcons name='arrow-left' size={25} />
                </Button>
            ),
        });
    }

    handleAnswers = (res) => {
        this.setState((state) => {
            return {
                correctAnswers: state.correctAnswers + res,
                cardsAnswered: state.cardsAnswered < this.props.cards.length ? state.cardsAnswered + 1 : state.cardsAnswered
            }
        },
            () => {
                if (this.state.cardsAnswered === this.props.cards.length) {
                    clearLocalNotification()
                        .then(setLocalNotification)
                }
            });

    }

    render() {
        let deckSize = this.props.cards.length;
        let card = this.props.cards[this.state.cardsAnswered];
        let navigation = this.props.navigation;
        let progress = this.state.cardsAnswered / deckSize;
        return (
            <Surface style={styles.surface}>
                {this.state.cardsAnswered === deckSize
                    ?
                    <View style={styles.stats}>
                        <QuizResults correctAnswers={this.state.correctAnswers} deckSize={deckSize} navigation={navigation} id={this.props.id} />
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <ProgressBar progress={progress} color={Colors.red800} />
                        <FlashCard card={card} cardsLeft={`${this.state.cardsAnswered+1} of ${deckSize}`} handleAnswers={this.handleAnswers} />
                    </View>
                }
            </Surface>
        )
    }
}

const styles = StyleSheet.create({
    surface: {
        flex: 1
    },
    stats: {
        justifyContent: 'center',
        padding: 10,
        flex: 1
    }
});

const mapStateToProps = ({ decks }, props) => {
    const deck = decks[props.route.params.id];
    return {
        cards: deck ? deck.cards : [],
        id: props.route.params.id,
        ...props
    }
}

export default connect(mapStateToProps)(Quiz)
