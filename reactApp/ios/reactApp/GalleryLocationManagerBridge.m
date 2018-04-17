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

  RCT_EXTERN_METHOD(startLocationRanging:(NSString *)method )
  RCT_EXTERN_METHOD(test:(NSString *) name)

@end
