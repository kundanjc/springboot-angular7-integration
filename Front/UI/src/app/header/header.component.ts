import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { RouterService } from '../services/router.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  constructor(private routerService: RouterService,
    private router: Router,
    private location: Location) {
    router.events.subscribe((val) => {
      if (location.path().indexOf('listview') > -1) {
        this.isNoteView = false;
      }
    })
  }

  ngOnInit() {
  }


  switchView() {
    if (this.isNoteView) {
      this.routerService.routeToListView();
      this.isNoteView = false;
    }
    else {
      //this.routerService.routeToNotesView();
      this.routerService.routeToNoteView();
      this.isNoteView = true;
    }
  }
}
