import React, { Component } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Card, Avatar, TextInput, Button, Caption } from 'react-native-paper';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class NewDeck extends Component {
    state = { title: '', description: '' };

    titleLimit = 30;
    descriptionLimit = 500;

    handelTitleChange = (input) => {
        if (input.length <= this.titleLimit) {
            this.setState({ title: input });
        }
    }

    handelDescriptionChange = (input) => {
        if (input.length <= this.descriptionLimit) {
            this.setState({ description: input });
        }
    }

    disabled = () => {
        return this.state.title === '';
    }

    submit = () => {
        let { title, description } = this.state;
        this.props.dispatch(addDeck({ title, description },
            (id) => { this.props.navigation.navigate('DeckFront', { id: id }) }))
        Keyboard.dismiss();
        this.setState({ title: '', description: '' });
    }

    cancel = () => {
        this.setState({ value: '' });
        Keyboard.dismiss();
        this.props.navigation.navigate('Decks');
    }

    render() {
        let disabled = this.disabled();
        let { title, description } = this.state;

        return (
            <Card style={styles.card} >
                <Card.Title
                    title='New Deck'
                    left={(props) => <Avatar.Icon {...props} icon='plus' />} />
                <Card.Content style={styles.content} >
                    <TextInput label='Title' mode='outlined' value={title} onChangeText={this.handelTitleChange} />
                    {title.length > 0
                        ? <Caption style={styles.caption}>{this.titleLimit - title.length} charecters left</Caption>
                        : null}
                    <TextInput label='Description' mode='outlined' multiline={true} value={description} onChangeText={this.handelDescriptionChange} />
                    {description.length > 0
                        ? <Caption style={styles.caption}>{this.DescriptionLimit - description.length} charecters left</Caption>
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