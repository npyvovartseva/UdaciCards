import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { View, Image, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider, Title } from 'react-native-paper';

import Home from './components/Home';
import DeckFront from './components/DeckFront';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1a237e',
    accent: '#FF6347',
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>

          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home}
                options={{
                  headerTitle: props => <LogoTitle {...props} />,
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }} />
              <Stack.Screen name="DeckFront" component={DeckFront} options={{ title: '' }} />
              <Stack.Screen name="NewCard" component={NewCard} options={{ title: '' }} />
              <Stack.Screen name="Quiz" component={Quiz} options={{ title: '' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

function LogoTitle() {
  return (
    <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./assets/uc_launcher.png')}
      />
      <Title style={{color:'#FFF', marginLeft:10}}>UdaciCards</Title>
    </View>
  );
}