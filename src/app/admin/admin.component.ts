import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from './../models/project.model';
import { FirebaseListObservable } from '../../../node_modules/angularfire2/database';
import { LoginService } from '../services/login.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectsService, LoginService]
})
export class AdminComponent implements OnInit {
  private user;
  projects: FirebaseListObservable<any[]>;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  showDeleteForm: boolean = false;
  selectedProject = null;

  constructor(private projectsService: ProjectsService, public loginService: LoginService) {}

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
  }

  toggleAddForm() {
    this.hideAllForms();
    this.showAddForm = !this.showAddForm;
  }

  toggleEditForm() {
    this.hideAllForms();
    this.showEditForm = !this.showEditForm;
  }

  toggleDeleteForm() {
    this.hideAllForms();
    this.showDeleteForm = !this.showDeleteForm;
  }

  hideAllForms() {
    this.showAddForm = false;
    this.showEditForm = false;
    this.showDeleteForm = false;
  }

  submitForm(imgUrl: string, imgAltTag: string, name: string, description: string, githubLink: string, linkTitleTag: string) {
    const newProject: Project = new Project(imgUrl, imgAltTag, name, description, githubLink, linkTitleTag);
    this.projectsService.addProject(newProject);
    this.hideAllForms();
  }

  editProjectClicked(projectToEdit) {
    this.selectedProject = projectToEdit;
  }

  cancelEdit() {
    this.selectedProject = null;
  }

  updateProjectClicked(projectToUpdate) {
    this.projectsService.updateProject(projectToUpdate);
    this.cancelEdit();
  }

  deleteProjectClicked(projectToDelete) {
    this.projectsService.deleteProject(projectToDelete);
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
  }

  runLogout() {
    this.loginService.logout();
  }
}
