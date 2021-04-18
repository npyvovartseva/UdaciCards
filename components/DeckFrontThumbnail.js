import React from 'react';
import {StyleSheet } from 'react-native';
import {Card} from 'react-native-paper';

function DeckFrontThumbnail(props) {
    const { title, cards } = props;
    return (
        <Card style={styles.card}>

            <Card.Title
                title={title}
                subtitle={`${cards} cards`}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
      margin: 4,
      justifyContent: 'center',

    }
  });

export default DeckFrontThumbnail;
