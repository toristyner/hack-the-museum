import React from 'react'
import { Image, ScrollView, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { styles } from '../styles'

const { width, height } = Dimensions.get('window')

const GenreSlider = props => (
  <View style={myStyle.container}>
    <Text style={styles.bold}>{`Top Genres`}</Text>
    <ScrollView
      contentContainerStyle={myStyle.container}
      horizontal
    >
      <View style={myStyle.scroller}>
      {
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((m,i) => <View
            key={`g${i}`}
            style={ { width: 100, height: 100, borderWidth: 1, margin: 5}}
          />)
      }
      </View>
    </ScrollView>
    <Text style={myStyle.seeMore}>{`See More`}</Text>
  </View>
)


const myStyle = {
  container: {
    padding: 10
  },
  scroller: {
    flexDirection: 'row'
  },
  seeMore: {
    textAlign: 'right',
    paddingRight: 10,
    ...styles.bold
  }
}

GenreSlider.propTypes = {
  photoUrl: PropTypes.string
}

GenreSlider.defaultProps = {}

export default GenreSlider