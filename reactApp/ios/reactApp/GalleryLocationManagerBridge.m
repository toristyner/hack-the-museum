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
  RCT_EXTERN_METHOD(requestPermissions)
  RCT_EXTERN_METHOD(startLocationRanging)
@end

@interface RCT_EXTERN_MODULE(BackendService, NSObject)
  RCT_EXTERN_METHOD(test:(NSString *) name)
  RCT_EXTERN_METHOD(registerDevice)
@end
