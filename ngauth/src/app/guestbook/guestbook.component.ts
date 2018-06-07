import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    let new_entry = {quote: this.quote, name: this.name};
    this.quote = '';
    this.name = '';
    this.guestbook_entries.push(new_entry);
  }

}
