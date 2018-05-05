import React, { Component } from 'react'
import { TextInput } from 'react-native'
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
      <TextInput
        onChangeText={this.onChangeTextDelayed}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        style={{ ...myStyle.search, ...this.props.style }}
      />
    )
  }
}

const myStyle = {
  search: {
    height: 30,
    borderWidth: 1,
    borderColor: lighterGray,
    backgroundColor: lighterGray,
    padding: 5,
  },
}

SearchBar.defaultProps = {
  style: {},
  placeholder: 'Search for a song...',
  placeholderTextColor: lighterGray,
}

SearchBar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  style: PropTypes.object,
}

export default SearchBar
