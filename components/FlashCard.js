import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Card, Button, Title, Subheading } from 'react-native-paper';

export class FlashCard extends Component {

    state = {
        showAnswer: false
    };

    handleToogle = () => {
        this.setState((state) => { return { showAnswer: !state.showAnswer } })
    }

    handleAnswers = (num) => {
        this.props.handleAnswers(num);
    }
    render() {
        const { question, answer } = this.props.card;
        const cardsLeft = this.props.cardsLeft;
        return (

            <Card style={styles.card}>
                <Card.Title
                    subtitle={cardsLeft}
                    subtitleStyle={styles.subtitle}
                />
                <Card.Content style={styles.content}>
                    <Title style={styles.title}>{question}</Title>
                    {this.state.showAnswer ? <Subheading style={styles.subheading}>{answer}</Subheading> : null}
                    <Button style={styles.button} onPress={this.handleToogle}>{this.state.showAnswer ? 'hide answer' : 'show answer'}</Button>
                </Card.Content>
                <Card.Actions style={styles.actions}>
                    <Button style={styles.button} mode='outlined' onPress={() => { this.handleAnswers(0) }}>Incorrect</Button>
                    <Button style={styles.button} mode='outlined' onPress={() => { this.handleAnswers(1) }}>Correct</Button>
                </Card.Actions>
            </Card>
        )
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        padding: 20,
        margin: 20
    },
    subtitle: {
        flex: 1,
        alignSelf:'flex-end'
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
        padding: 20
    },
    button: {

    }
});

export default connect()(FlashCard)
