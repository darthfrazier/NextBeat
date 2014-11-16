//
//  NewEventViewController.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/8/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class NewEventViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var EventName: UITextField!
    @IBOutlet weak var AdminPassword: UITextField!
    @IBOutlet weak var EventDescription: UITextField!
    @IBOutlet weak var EventPassword: UITextField!
    
    //EventName.delegate = self
    //AdminPassword.delegate = self
    
    

    let locationManger:CLLocationManager = CLLocationManager()
    var userlocation:PFGeoPoint?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManger.desiredAccuracy = kCLLocationAccuracyBest
        let authstate = CLLocationManager.authorizationStatus()
        if(authstate == CLAuthorizationStatus.NotDetermined){
            println("Not Authorised")
            locationManger.requestWhenInUseAuthorization()
        }
        PFGeoPoint.geoPointForCurrentLocationInBackground() {
            (point:PFGeoPoint!, error:NSError!) -> Void in
            if point != nil {
                            // Succeeding in getting current location
                println("fuck")
                self.userlocation = point
            }
            else {
                            // Failed to get location
                println("Failed to get current location") // never printed
            }
        }
        // Do any additional setup after loading the view.
    }
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func CreateEvent(sender: AnyObject) {
        var event:PFObject = PFObject(className: "Events")
        event["eventname"] = EventName.text
        event["adminpassword"] = AdminPassword.text
        event["eventdescription"] = EventDescription.text
        event["userID"] = UIDevice.currentDevice().identifierForVendor.UUIDString
        event["eventlocation"] = userlocation

        if (EventPassword.text.isEmpty == false) {
            event["eventpassword"] = EventPassword.text
        }
        else {
            event["eventpassword"] = "null"
        }
        event.saveInBackground()
        
        self.navigationController?.popToRootViewControllerAnimated(true)
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true;
    }
    
    override func touchesBegan(touches:NSSet, withEvent event: UIEvent) {
        self.view.endEditing(true)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
