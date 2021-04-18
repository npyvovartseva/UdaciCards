import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';

const Tab = createBottomTabNavigator();

export class Home extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Decks') {
                            iconName = focused
                                ? 'cards'
                                : 'cards-outline';
                        } else if (route.name === 'New Deck') {
                            iconName = focused ? 'book-plus-multiple' : 'book-plus-multiple-outline';
                        }
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: '#FF6347',
                    inactiveTintColor: '#808080',
                    keyboardHidesTabBar: true
                }}
                initialRouteName="Decks"
            >
                <Tab.Screen name='Decks' component={DeckList} />
                <Tab.Screen name='New Deck' component={NewDeck} />
            </Tab.Navigator>
        )
    }
}

export default connect()(Home)
