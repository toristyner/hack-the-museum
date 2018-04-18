//
//  galleryLocationService.swift
//  mobileFramework
//
//  Created by Peter.Alt on 4/19/17.
//  Copyright © 2017 Philadelphia Museum of Art. All rights reserved.
//

import Foundation
import UIKit
import CoreLocation

public enum GalleryLocationManagerError: Error {
    case missingRegion
    case insufficientPermissions
}

@objc(GalleryLocationManager)
public class GalleryLocationManager : NSObject  {
    
    private var locationManager : CLLocationManager!
    private var locationUpdateTimer : Timer?
    public var delegate : GalleryLocationManagerDelegate?
  
    override public init() {
      print("IN THIS CONSTRUCTOR")
      super.init()
      self.locationSensingMethod = "apple"
      self.locationManager = CLLocationManager()
      self.locationManager.delegate = self
    }
  
    public init(locationManager: CLLocationManager) {
      super.init()
      self.locationManager = locationManager
      self.locationManager.delegate = self
    }
  
    var bridge: RCTBridge!
    public var beaconRegion: CLBeaconRegion?
  
    internal var locationSensingMethod : String?
    
    internal var previousLocation : Location?
    
    internal var lastLocation : CLLocation?
    
    var currentLocation : Location? {
        get {
            if self.locationSensingMethod == Constants.locationSensing.method.apple {
                if self.lastLocation != nil {
                    return LocationStore.sharedInstance.locationForCLLocation(location: self.lastLocation!)
                }
            }
            return nil
        }
    }
    
    var desiredAccuracy : CLLocationAccuracy {
        set(value) {
            locationManager.desiredAccuracy = value
        }
        get {
            return locationManager.desiredAccuracy
        }
    }
    
    public func startUpdatingHeading(with headingFilter: Double) {
        self.locationManager.headingFilter = headingFilter
        self.locationManager.startUpdatingHeading()
    }
  
    // example of swift func with callbak
    @objc func addEvent(_ name: String, location: String, date: NSNumber, callback: (NSArray) -> () ) -> Void {
      // Date is ready to use!
      NSLog("%@ %@ %@", name, location, date)
      callback([["name": "113"]])
    }
  
    @objc public func startLocationRanging() {
      if (CLLocationManager.authorizationStatus() != CLAuthorizationStatus.authorizedWhenInUse) {
          print("PERMISSIONS NO GOOD")
//            throw GalleryLocationManagerError.insufficientPermissions
      } else {
          //let's finally start
          locationManager.startUpdatingLocation()
          self.locationUpdateTimer?.invalidate()
          self.locationUpdateTimer = Timer.scheduledTimer(timeInterval: Constants.locationSensing.locationUpdateInterval, target: self, selector: #selector(checkForLocationUpdates), userInfo: nil, repeats: true)
          self.locationSensingMethod = "apple"
      }
    }
    
    @objc public func requestPermissions() {
        locationManager.requestWhenInUseAuthorization()
    }

    @objc internal func checkForLocationUpdates() {
        // if we don't have a current location, we can skip right out
        guard let currentLocation = self.currentLocation else {
            return
        }
        
        if self.previousLocation == currentLocation {
            print("PREVIOUS EQUALS CURRENT", currentLocation)
            // previous and current location are identical, which means we haven't moved
            // so we don't need to trigger a location update
        } else {
            // we have to trigger an update since it seems like we moved
            print("WE MOVED")
            self.delegate?.locationManager(locationManager: self, didEnterKnownLocation: currentLocation)
          
            // and we also have to set the previous location to the current location
            self.previousLocation = currentLocation
        }
    }
  
    internal func beaconRanged(major: Int, minor: Int, UUID: UUID) {
        let store = BeaconStore.sharedInstance
    
        store.markInRange(major: major, minor: minor, UUID: UUID)
        
    }
    
}

extension GalleryLocationManager: CLLocationManagerDelegate {
    
    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let lastLocation = locations.last {
            if self.lastLocation == nil {
                self.lastLocation = lastLocation
            }
            
            if self.lastLocation != lastLocation {
                self.lastLocation = lastLocation
            }
        }
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        self.delegate?.locationManager(locationManager: self, didUpdateHeading: newHeading)
    }
    
    public func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
        
        let beacons = beacons.filter{ $0.proximity != CLProximity.unknown }
        
        if let closestBeacon = beacons.first {
            // we really only look for beacons within our defined UUID
            if closestBeacon.proximityUUID == Constants.beacons.defaultUUID {
                beaconRanged(major: closestBeacon.major.intValue, minor: closestBeacon.minor.intValue, UUID: region.proximityUUID)
            }
        }
        
    }
}
