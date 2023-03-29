import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  lang: string = 'en';
  languageLong: string = '';

  constructor() { }

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';

    this.languageLong = this.getLanguageLong(this.lang) || 'English';
  }

  getLanguageLong(lang: string): string {
    switch(lang) { 
      case 'en':
        return 'English ';

      case  'de':
        return 'Deutsch ';

      case 'spa':
        return 'Español ';

      default:
        return 'English ';
    }
  }

  getFlags(): string {
    switch(this.lang) { 
      case 'en':
        return 'flag-usa';

      case  'de':
        return 'flag-de';

      case 'spa':
        return 'flag-spa';

      default:
        return 'flag-usa';
    }
  }

  changeLanguage(language: string){
    this.lang = language;
    localStorage.setItem('lang', language);
    window.location.reload();
  }

}
