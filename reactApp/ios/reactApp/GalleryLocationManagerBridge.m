//
//  GalleryLocationManagerBridge.m
//  reactApp
//
//  Created by Victoria Styner on 4/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// GalleryLocationManagerBridge
#import <Foundation/Foundation.h>
#import "mobileFramework.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(GalleryLocationManager, RCTEventEmitter)
  - (dispatch_queue_t)methodQueue
  {
    return dispatch_get_main_queue();
  }

  + (BOOL)requiresMainQueueSetup
  {
    return YES;
  }

  RCT_EXTERN_METHOD(requestPermissions)
  RCT_EXTERN_METHOD(startLocationRanging)
  RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date callback: (RCTResponseSenderBlock)callback);
  RCT_EXTERN_METHOD(supportedEvents)

@end

@interface RCT_EXTERN_MODULE(ReactNativeEventEmitter, RCTEventEmitter)

  RCT_EXTERN_METHOD(supportedEvents)

@end


@interface RCT_EXTERN_MODULE(BackendService, NSObject)
  - (dispatch_queue_t)methodQueue
  {
    return dispatch_get_main_queue();
  }

  + (BOOL)requiresMainQueueSetup
  {
    return YES;
  }

  RCT_EXTERN_METHOD(retrieveGeolocationData:(RCTResponseSenderBlock)callback)

@end

