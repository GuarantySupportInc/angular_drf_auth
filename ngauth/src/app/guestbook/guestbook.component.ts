import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {
  /*
  guestbook_entries = [
    {quote: 'This site is kinda empty, huh?', name: 'Judgy Joe'},
    {quote: 'Can we get a like button?', name: 'a social butterfly'},
  ];
  */
  guestbook_entries: any;
  no_entries: Boolean = false;
  // variables for new entries
  name: String;
  quote: String;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.getGuestbookEntries().subscribe(
      (entries: Array<any>) => {
        console.log(entries);
        this.guestbook_entries = entries;
        if (entries.length == 0) {
          this.no_entries = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    let new_entry = {quote: this.quote, name: this.name};
    this.quote = '';
    this.name = '';
    this.guestbook_entries.push(new_entry);

    this.auth.createGuestbookEntry(new_entry).subscribe(
      (response) => {
        console.log(response);
        if (this.no_entries) {
          this.no_entries = false;
        }
      },
      (err) => {
        console.log(err);
        this.guestbook_entries.pop(); // delete the entry we just added prematurely
      }
    );
  }

}
