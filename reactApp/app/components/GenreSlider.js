import React from 'react'
import { Image, ScrollView, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { GenreTile } from './'
import { styles } from '../styles'
import { getGenreColor } from '../utils/ColorPicker';

const { width, height } = Dimensions.get('window')

const GenreSlider = props => (
  <View style={myStyle.container}>
    <Text style={styles.bold}>{`Genres`}</Text>
    <ScrollView horizontal>
      <View style={myStyle.scroller}>
      {
        props.genres && props.genres.map((g,i) => (
          <GenreTile
            key={`g${i}`}
            name={g.name}
            onPress={() => props.onPressGenre(g)}
            color={getGenreColor()}
          />
        ))
      }
      </View>
    </ScrollView>
  </View>
)

const myStyle = {
  container: {
    padding: 10
  },
  scroller: {
    flexDirection: 'row'
  }
}

GenreSlider.propTypes = {
  photoUrl: PropTypes.string
}

GenreSlider.defaultProps = {}

export default GenreSlider