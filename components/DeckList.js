import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, Searchbar } from 'react-native-paper';
import { handelInitialData } from '../actions/shared';
import DeckFrontThumbnail from './DeckFrontThumbnail';

class DeckList extends React.Component {

  state = {
    searchQuery: ''
  };

  componentDidMount() {
    this.props.dispatch(handelInitialData());
  }

  onChangeSearch = (query) => {
    this.setState({ searchQuery: query })
  }

  filteredDecks = () => {
    return Object.values(this.props.decks).filter(item => item.title.includes(this.state.searchQuery));

  }

  renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => {
        this.props.navigation.navigate('DeckFront', {
          id: item.id
        });
      }}
      id={item.id}
    >
      <DeckFrontThumbnail
        title={item.title} cards={item.cards.length} />
    </TouchableHighlight>
  )

  colors = DefaultTheme.colors;

  render() {
    const decks = this.filteredDecks();
    return (
      <SafeAreaView style={styles.container}>
        { Object.keys(this.props.decks).length === 0
          ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>Create your first Deck!</Text>
          </View>
          :
          <View
            style={[
              styles.fadingContainer,
              {
                // Bind opacity to animated value
                opacity: this.state.fadeAnim
              }
            ]}
          >
            <Searchbar
              placeholder="Search"
              onChangeText={this.onChangeSearch}
              value={this.state.searchQuery}
            />
            <FlatList
              data={decks}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[styles.content, { backgroundColor: this.colors.background }]}
            />
          </View>
        }

      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  content: {
    padding: 10
  }
});

function mapStatetoProps({ decks }, props) {
  return {
    decks: decks ? decks : {},
    ...props
  }
}

export default connect(mapStatetoProps)(DeckList);
