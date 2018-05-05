import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { GenreTile } from './'
import { styles } from '../styles'

const GenreSlider = props => (
  <View style={myStyle.container}>
    <Text style={styles.bold}>Genres</Text>
    <ScrollView horizontal>
      <View style={myStyle.scroller}>
        {
          props.genres && props.genres.map(g => (
            <GenreTile
              size="small"
              key={`g${g.name}`}
              name={g.name}
              onPress={() => props.onPressGenre(g.name)}
              color={g.color}
            />
          ))
        }
      </View>
    </ScrollView>
  </View>
)

const myStyle = {
  container: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  scroller: {
    flexDirection: 'row',
  },
}

GenreSlider.propTypes = {
  photoUrl: PropTypes.string,
}

GenreSlider.defaultProps = {}

export default GenreSlider
