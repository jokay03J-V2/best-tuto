import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../services/db/db.service';
import { Tuto } from '../types';

@Component({
  selector: 'app-tuto-post',
  templateUrl: './tuto-post.component.html',
  styleUrls: ['./tuto-post.component.scss']
})
export class TutoPostComponent implements OnInit {

  constructor(private db: DbService) { }
  @Input() tuto: Tuto | null = null

  ngOnInit(): void {
    console.log(this.tuto?.tags);
    
  }

  UpVote(div: HTMLDivElement) {
    console.log(div.textContent);
    console.log(this.tuto!.upvote);
    this.db.updateUpvote(this.tuto?.id)
  }

}
