import React, { Component } from 'react'
import { TextInput } from 'react-native'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { lighterGray } from '../styles'


class SearchBar extends Component {
  constructor() {
    super()
    this.onChangeTextDelayed = debounce((val) => {
      if (val) {
        this.props.onChangeText(val)
      }
    }, 1300)
  }

  componentDidMount() {
    this.inputRef.focus()
  }

  render() {
    return (
      <TextInput
        ref={ref => this.inputRef = ref}
        autoCorrect={false}
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
