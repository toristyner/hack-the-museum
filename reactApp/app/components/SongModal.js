import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Linking, Clipboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import { darkGray, lighterGray, bloodOrange } from '../styles'
import { getTwitterUrl, getShareUrl } from '../utils/PhilaMuseumService'

class SongModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    artworkId: PropTypes.string.isRequired,
    songId: PropTypes.string.isRequired,
  }

  constructor() {
    super()

    this.actions = [
      {
        text: 'Share on Twitter',
        icon: 'logo-twitter',
        onAction: this.openInBrowser(getTwitterUrl),
      },
      {
        text: 'Open in Browser',
        icon: 'ios-globe',
        onAction: this.openInBrowser(getShareUrl),
      },
      {
        text: 'Copy URL',
        icon: 'ios-link',
        onAction: this.copySongUrl,
      },
    ]
  }

  openInBrowser = urlMethod => () => {
    const { artworkId, songId } = this.props

    Linking.openURL(urlMethod({ artworkId, songId }))
    this.props.closeModal()
  }

  copySongUrl = () => {
    const { artworkId, songId } = this.props

    Clipboard.setString(getShareUrl({ artworkId, songId }))
    this.props.closeModal()
  }

  renderListItem = ({ onAction, icon, text }) => (
    <TouchableOpacity
      key={text}
      onPress={onAction}
    >
      <View style={myStyles.listItem}>
        <Icon
          name={icon}
          size={30}
          color={darkGray}
        />
        <Text
          style={myStyles.listItemText}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { closeModal } = this.props

    return (
      <View style={myStyles.container}>
        <View style={myStyles.header}>
          <Text style={myStyles.headerText}>
            Share
          </Text>
          <TouchableOpacity
            style={myStyles.headerClose}
            onPress={closeModal}
          >
            <Icon
              name="md-close"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={myStyles.content}>
          {this.actions.map(item => this.renderListItem(item))}
        </View>
      </View>
    )
  }
}

const myStyles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: bloodOrange,
  },
  headerText: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  headerClose: {
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: lighterGray,
  },
  listItemText: {
    flex: 1,
    marginTop: 5,
    marginLeft: 15,
    fontSize: 16,
  },
}

export default SongModal
