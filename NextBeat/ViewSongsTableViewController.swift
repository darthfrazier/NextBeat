//
//  ViewSongsTableViewController.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/15/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class ViewSongsTableViewController: UITableViewController {

    @IBOutlet weak var LabelTest: UILabel!
    var timelineData:NSMutableArray! = NSMutableArray()
    var eventname: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    func loadData(){
        timelineData.removeAllObjects()
        
        var findTimelineData:PFQuery = PFQuery(className: "Songs")
        findTimelineData.whereKey("event", equalTo:eventname)
        findTimelineData.findObjectsInBackgroundWithBlock{(objects:[AnyObject]!, error:NSError!)->Void in
            
            if error == nil{
                for object in objects{
                    let song:PFObject = object as PFObject
                    self.timelineData.addObject(song)
                }
                
                let array:NSArray = self.timelineData.reverseObjectEnumerator().allObjects
                self.timelineData = NSMutableArray(array: array)
                
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

    

    
    // Override to support editing the table view.
   override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell:SongTableViewCell = tableView.dequeueReusableCellWithIdentifier("SongCell", forIndexPath: indexPath) as SongTableViewCell
        
        let song:PFObject = self.timelineData.objectAtIndex(indexPath.row) as PFObject
        
       cell.SongTitle.alpha = 0
        cell.ArtistName.alpha = 0
        cell.VoteCount.alpha = 0
        cell.DownVote.alpha = 0
        cell.UpVote.alpha = 0
        
        cell.SongTitle.text = song.objectForKey("songtitle") as? String
        if (song.objectForKey("artistname") as NSString != "null") {
            cell.ArtistName.text = song.objectForKey("artistname") as AnyObject! as? String
        }
    var test: Int
    if (song.objectForKey("votescore") != nil) {
        test = song.objectForKey("votescore") as Int
    } else {
        test = 0
    }
    
    
    cell.VoteCount.text = String(test)
        UIView.animateWithDuration(0.2, animations: {
            
            cell.SongTitle.alpha = 1
            cell.ArtistName.alpha = 1
            cell.VoteCount.alpha = 1
            cell.DownVote.alpha = 1
            cell.UpVote.alpha = 1
        })
    
        return cell

    }
   /* @IBAction func UpVote(sender: AnyObject) {
        var UpVote:PFQuery = PFQuery(className: "Songs")
        let cell = sender as SongTableViewCell
        var songname = cell.SongTitle.text
        var findTimelineData:PFQuery = PFQuery(className: "Songs")
        UpVote.whereKey("songtitle", equalTo:songname)
        UpVote.getObjectWithId
            
            if error == nil{
                for object in objects{
                    let song:PFObject = object as PFObject
                    self.timelineData.addObject(song)
                }
                
                let array:NSArray = self.timelineData.reverseObjectEnumerator().allObjects
                self.timelineData = NSMutableArray(array: array)
                
                self.tableView.reloadData()
            }
        }
        
        
    }*/
    
    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
    // Return NO if you do not want the specified item to be editable.
    return true
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
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
        if segue.identifier == "NewSongs"
        {
            var destinationViewController:NewSongViewController = segue.destinationViewController as NewSongViewController
            destinationViewController.eventname = eventname
        }

    
    }
    

}
