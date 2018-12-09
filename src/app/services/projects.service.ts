import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectsService {
  projects: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.projects = database.list('projects');
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(projectId: string) {
    return this.database.object('projects/' + projectId);
  }

  addProject(newProject: Project) {
    this.projects.push(newProject);
  }

  updateProject(projectToUpdate) {
    var projectInFirebase = this.getProjectById(projectToUpdate.$key);
    projectInFirebase.update({
      imgUrl: projectToUpdate.imgUrl,
      imgAltTag: projectToUpdate.imgAltTag,
      name: projectToUpdate.name,
      description: projectToUpdate.description,
      githubLink: projectToUpdate.githubLink,
      linkTitleTag: projectToUpdate.linkTitleTag
    });
  }

  deleteProject(projectToDelete){
    var projectInFirebase = this.getProjectById(projectToDelete.$key);
    projectInFirebase.remove();
  }
}
