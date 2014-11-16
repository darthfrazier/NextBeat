//
//  SongTableViewCell.swift
//  NextBeat
//
//  Created by Karl  Frazier on 11/15/14.
//  Copyright (c) 2014 Karl  Frazier. All rights reserved.
//

import UIKit

class SongTableViewCell: UITableViewCell {
    @IBOutlet weak var SongTitle: UILabel!
    @IBOutlet weak var ArtistName: UILabel!
    @IBOutlet weak var VoteCount: UILabel!
    @IBOutlet weak var DownVote: UIButton!
    @IBOutlet weak var UpVote: UIButton!
    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
