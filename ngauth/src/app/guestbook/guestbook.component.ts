import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {
  guestbook_entries = [
    {quote: 'This site is kinda empty, huh?', name: 'Judgy Joe'},
    {quote: 'Can we get a like button?', name: 'a social butterfly'},
  ];
  // variables for new entries
  name: String;
  quote: String;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.getGuestbookEntries().subscribe(
      (entries) => {
        console.log(entries);
        // TODO - if there's no entries, display a message to that effect
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
      },
      (err) => {
        console.log(err);
        // TODO - display an error message and remove the new entry
        // from the displayed list (to keep parity with the db)
      }
    );
  }

}
