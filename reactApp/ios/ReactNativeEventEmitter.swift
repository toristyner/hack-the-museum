//
//  ReactNativeEventEmitter.swift
//  reactApp
//
//  Created by Victoria Styner on 4/18/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

//
//  ReactNativeEventEmitter.swift
//
import Foundation

@objc(ReactNativeEventEmitter)
open class ReactNativeEventEmitter: RCTEventEmitter {
  
  override init() {
    super.init()
    EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
  }
  
  /// Base overide for RCTEventEmitter.
  ///
  /// - Returns: all supported events
  @objc open override func supportedEvents() -> [String] {
    return EventEmitter.sharedInstance.allEvents
  }
  
}
