//
//  NewEventViewController.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/8/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class NewEventViewController: UIViewController {

    @IBOutlet weak var EventName: UITextField!
    @IBOutlet weak var AdminPassword: UITextField!
    @IBOutlet weak var EventDescription: UITextField!
    @IBOutlet weak var EventPassword: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

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
        if (EventPassword.text.isEmpty == false) {
            event["eventpassword"] = EventPassword.text
        }
        else {
            event["eventpassword"] = "null"
        }
        event.saveInBackground()
        
        self.navigationController?.popToRootViewControllerAnimated(true)
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
