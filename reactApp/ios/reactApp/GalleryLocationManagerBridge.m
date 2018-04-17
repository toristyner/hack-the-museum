//
//  GalleryLocationManagerBridge.m
//  reactApp
//
//  Created by Victoria Styner on 4/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// GalleryLocationManagerBridge
#import <React/RCTBridgeModule.h>
#import "mobileFramework.h"



@interface RCT_EXTERN_MODULE(GalleryLocationManager, NSObject)
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
@end

@interface RCT_EXTERN_MODULE(BackendService, NSObject)
  RCT_EXTERN_METHOD(test:(NSString *) name)
  RCT_EXTERN_METHOD(registerDevice)
@end
