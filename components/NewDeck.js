import React, { Component } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Card, Avatar, TextInput, Button, Caption } from 'react-native-paper';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class NewDeck extends Component {
    state = { value: '' };

    titleLimit = 50;

    handelInputChange = (input) => {
        if (input.length <= this.titleLimit) {
            this.setState({ value: input });
        }
    }

    disabled = () => {
        return this.state.value === '';
    }

    submit = () => {
        this.props.dispatch(addDeck(this.state.value,
            (id) => { this.props.navigation.navigate('DeckFront', { id: id }) }))
        Keyboard.dismiss();
        this.setState({ value: '' });
    }

    cancel = () => {
        this.setState({ value: '' });
        Keyboard.dismiss();
        this.props.navigation.navigate('Decks');
    }

    render() {
        let disabled = this.disabled();
        let value = this.state.value;

        return (
            <Card style={styles.card} >
                <Card.Title
                    title='New Deck'
                    left={(props) => <Avatar.Icon {...props} icon='plus' />} />
                <Card.Content style={styles.content} >
                    <TextInput label='Title' mode='outlined' multiline={true} value={value} onChangeText={this.handelInputChange} />
                    {value.length > 0
                        ? <Caption style={styles.caption}>{this.titleLimit - value.length} charecters left</Caption>
                        : null}
                </Card.Content>
                <Card.Actions style={styles.actions}>
                    <Button
                        style={styles.button}

                        onPress={this.cancel}>
                        Cancel
                                </Button>
                    <Button
                        style={styles.button}
                        mode='contained'
                        onPress={this.submit}
                        disabled={disabled}>
                        Submit
                                </Button>

                </Card.Actions>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 30
    },
    content: {
        flex: 3,
        justifyContent: 'space-between'
    },
    caption: {
        alignSelf: 'flex-end',
        flex: 1
    },
    actions: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    button: {

    }
})

export default connect()(NewDeck);