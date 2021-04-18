import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class DeckFront extends React.Component {

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => { this.props.navigation.navigate('Home', { screen: 'Decks' }) }}>
                    <MaterialCommunityIcons name='arrow-left' size={25} />
                </Button>
            ),
        });
    }

    startQuiz = () => {
        this.props.navigation.navigate('Quiz', {
            id: this.props.deck.id
        })
    }
    render() {
        const { id, title, cards } = this.props.deck;

        return (
            <Card style={styles.card}>
                <Card.Title
                    style={styles.titleContainer}
                    title={title}
                    titleStyle={styles.title}
                    titleNumberOfLines={2}
                    subtitle={`${cards.length} cards`}
                    subtitleStyle={styles.subtitle}
                />
                <Card.Content style={styles.content}>
                    <Button style={styles.button} mode='outlined' onPress={() => this.props.navigation.navigate('NewCard', {
                        id: id
                    })}>Add Card</Button>
                    <Button style={styles.button} mode='contained' disabled={cards.length === 0} onPress={this.startQuiz}>Start Quiz</Button>
                </Card.Content>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 20,
    },
    titleContainer: {
        flex: 2,
    },
    title: {
        textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10
    }
});

function mapStateToProps(state, { route, navigation }) {
    const { id } = route.params;
    const deck = id ? state.decks[id] : {};
    return {
        deck,
        id,
        navigation
    }
}

export default connect(mapStateToProps)(DeckFront);
