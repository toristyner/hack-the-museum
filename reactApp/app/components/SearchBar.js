import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import * as _ from 'lodash'
import PropTypes from 'prop-types'
import { lighterGray } from '../styles'


class SearchBar extends Component {
  constructor() {
    super()
    this.onChangeTextDelayed = _.debounce((val) => {
      this.props.onChangeText(val)
    }, 2000)
  }

  render() {
    return (
      <View style={myStyle.container}>
        <TextInput
          onChangeText={this.onChangeTextDelayed}
          placeholder="Search for a song..."
          style={myStyle.search}
        />
      </View>
    )
  }
}

const myStyle = {
  container: {
    marginLeft: 15,
    marginRight: 10,
  },
  search: {
    height: 30,
    borderWidth: 1,
    borderColor: lighterGray,
    backgroundColor: lighterGray,
    padding: 5,
  },
}

SearchBar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
}

export default SearchBar
