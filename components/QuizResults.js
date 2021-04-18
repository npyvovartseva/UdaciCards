import React from 'react';
import { Card, Button, Title, Subheading } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function QuizResults(props) {
    let { correctAnswers, deckSize, id, navigation } = props;

    let restartQuiz = () => {
        navigation.push('Quiz', {
            id: id
        });
    }
    let backToDeck = () => {
        navigation.navigate('DeckFront', {
            id: id
        });
    }

    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <Title style={styles.title}>Quiz Results:</Title>
                <Subheading style={styles.subheading}>{`Correct: ${correctAnswers} out of ${deckSize} card(s)`}</Subheading>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <Button style={styles.button} mode='outlined' onPress={restartQuiz}>Restart Quiz</Button>
                <Button style={styles.button} onPress={backToDeck} >Done</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        padding: 20,
        margin: 20
    },
    content: {
        flex: 4,
        justifyContent: 'space-evenly'
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    subheading: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    actions: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    button: {
        flex: 1,
        marginBottom: 10
    }
});