//
//  NewSongViewController.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/15/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class NewSongViewController: UIViewController {
    
    @IBOutlet weak var SongTitle: UITextField!
    @IBOutlet weak var Artist: UITextField!
    
    var eventname: String?

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
    
    @IBAction func Submit(sender: AnyObject) {
        var song:PFObject = PFObject(className: "Songs")
        song["songtitle"] = SongTitle.text
        song["event"] = eventname
        if (Artist.text.isEmpty == false) {
            song["artistname"] = Artist.text
        }
        else {
            song["artistname"] = "null"
        }
        
        song.saveInBackground()
        
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
