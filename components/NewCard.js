import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Card, Title, TextInput, Button } from 'react-native-paper';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';

class NewCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        addCardToDeck(this.props.route.params.id, { ...this.state });
        this.props.dispatch(addCard(this.props.route.params.id, { ...this.state }));
        this.setState({ question: '', answer: '' });
        this.props.navigation.goBack();
    }

    disabled = () => {
        return this.state.question.length === 0 || this.state.answer.length === 0;
    }

    cancel = () => {
        this.setState({ question: '', answer: '' });
        this.props.navigation.goBack();
    }

    handelQuestionChange = (input) => {
        this.setState({ question: input });
    }
    handelAnswerChange = (input) => {
        this.setState({ answer: input });
    }

    render() {
        let disabled = this.disabled();
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior='padding'>
                    <Card>

                        <Card.Content>
                            <Title>
                                New Card
                    </Title>
                            <TextInput style={styles.inputFields} mode='outlined' label='Question' value={this.state.question} onChangeText={this.handelQuestionChange} />
                            <TextInput style={styles.inputFields} mode='outlined' label='Answer' value={this.state.answer} onChangeText={this.handelAnswerChange} />
                        </Card.Content>
                        <Card.Actions style={styles.actions}>
                            <Button onPress={this.cancel}>Cancel</Button>
                            <Button onPress={this.submit} mode='contained' disabled={disabled}>Add</Button>
                        </Card.Actions>
                    </Card>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    actions: {
        justifyContent: 'space-between',
        padding: 20
    },
    inputFields: {
        marginBottom: 10
    }
})

const mapStateToProps = (state, props) => {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(NewCard)
