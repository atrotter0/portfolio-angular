import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AboutMe } from '../models/aboutMe.model';

@Injectable()
export class AboutMeService {
  aboutMe: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.aboutMe = database.list('aboutMe');
  }

  getAboutMe() {
    return this.aboutMe;
  }

  getAboutMeById(aboutMeId: string) {
    return this.database.object('aboutMe/' + aboutMeId);
  }

  addAboutMe(newAboutMe: AboutMe) {
    this.aboutMe.remove();
    this.aboutMe.push(newAboutMe);
  }

  updateAboutMe(aboutMeToUpdate) {
    var aboutMeInFirebase = this.getAboutMeById(aboutMeToUpdate.$key);
    aboutMeInFirebase.update({
      background: aboutMeToUpdate.background,
      experience: aboutMeToUpdate.experience,
      education: aboutMeToUpdate.education,
      proficiencies: aboutMeToUpdate.proficiencies,
      hobbies: aboutMeToUpdate.hobbies
    });
  }
}
