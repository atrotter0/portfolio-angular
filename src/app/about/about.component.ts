import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { AboutMeService } from '../services/about-me.service';
import { getArrayFromString } from '../util/util';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutMeService]
})
export class AboutComponent implements OnInit {
  aboutMe: FirebaseListObservable<any[]>;
  background: string;
  experience: string;
  education: string;
  proficiencies: string[];
  hobbies: string[];

  constructor(private aboutMeService: AboutMeService) { }

  ngOnInit() {
    this.aboutMe = this.aboutMeService.getAboutMe();
    this.setProperties();
  }

  setProperties() {
    this.aboutMe.subscribe(record => {
      this.background = record[0].background;
      this.experience = record[0].experience;
      this.education = record[0].education;
      this.proficiencies = getArrayFromString(record[0].proficiencies);
      this.hobbies = getArrayFromString(record[0].hobbies);
    });
  }

  getArrayFromString(text: string) {
    return text.split(', ').map(proficiency => proficiency.trim());
  }
}
