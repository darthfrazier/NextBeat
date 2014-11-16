//
//  ViewEventsTableViewController.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/15/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class ViewEventsTableViewController: UITableViewController {

    var timelineData:NSMutableArray! = NSMutableArray()
    var userlocation: PFGeoPoint?
    let locationManger:CLLocationManager = CLLocationManager()

    
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

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    @IBAction func loadData(){
        timelineData.removeAllObjects()
        
        var findTimelineData:PFQuery = PFQuery(className: "Events")
        findTimelineData.whereKey("eventlocation", nearGeoPoint: userlocation, withinMiles:1.0)
        findTimelineData.findObjectsInBackgroundWithBlock{
            (objects:[AnyObject]!, error:NSError!)->Void in
            
            if error == nil{
                for object in objects{
                    let event:PFObject = object as PFObject
                    self.timelineData.addObject(event)
                }

                self.tableView.reloadData()
                
            }
            
        }
    }
    
    override func viewDidAppear(animated: Bool) {
        self.loadData()
    }
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Potentially incomplete method implementation.
        // Return the number of sections.
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete method implementation.
        // Return the number of rows in the section.
        return timelineData.count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell:EventsTableViewCell = tableView.dequeueReusableCellWithIdentifier("EventsCell", forIndexPath: indexPath) as EventsTableViewCell
        
        let event:PFObject = self.timelineData.objectAtIndex(indexPath.row) as PFObject
        
        cell.EventName.alpha = 0
        cell.EventDescription.alpha = 0
        
        
        cell.EventDescription.text = event.objectForKey("eventdescription") as String
        cell.EventName.text = event.objectForKey("eventname") as AnyObject! as? String
        
                
        UIView.animateWithDuration(0.5, animations: {
            cell.EventName.alpha = 1
            cell.EventDescription.alpha = 1
        })
        
        return cell
    }
   


    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the item to be re-orderable.
        return true
    }
    */

    
    // MARK: - Navigation

   // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        if segue.identifier == "EventSongs"
        {
            let cell = sender as EventsTableViewCell
            let eventname = cell.EventName.text
            var destinationViewController:ViewSongsTableViewController = segue.destinationViewController as ViewSongsTableViewController
            destinationViewController.eventname = eventname
        }
        
            
        }
        
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    
    
    
}