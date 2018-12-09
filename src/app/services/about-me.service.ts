import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Background } from './../models/background.model';

@Injectable()
export class AboutMeService {
  background: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.background = database.list('background');
  }

  getBackground() {
    return this.background;
  }

  getBackgroundById(backgroundId: string) {
    return this.database.object('background/' + backgroundId);
  }

  addBackground(newBackground: Background) {
    this.background[0] = newBackground;
  }

  updateBackground(backgroundToUpdate) {
    var backgroundInFirebase = this.getBackgroundById(backgroundToUpdate.$key);
    backgroundInFirebase.update({
      text: backgroundToUpdate.text
    });
  }

  deletebackground(backgroundToDelete){
    var backgroundInFirebase = this.getBackgroundById(backgroundToDelete.$key);
    backgroundInFirebase.remove();
  }
}
