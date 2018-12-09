import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoginService } from '../services/login.service';
import { AboutMeService } from '../services/about-me.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectsService, LoginService, AboutMeService]
})
export class AdminComponent implements OnInit {
  private user;
  projects: FirebaseListObservable<any[]>;
  aboutMe: FirebaseListObservable<any[]>;
  showProjectCmsControls: boolean = false;
  showAddProjectsForm: boolean = false;
  showEditProjectsForm: boolean = false;
  showDeleteProjectsForm: boolean = false;
  selectedProject = null;
  showAboutMeCmsControls: boolean = false;
  showAddAboutMeForm: boolean = false;
  showEditAboutMeForm: boolean = false;
  showDeleteAboutMeForm: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private aboutMeService: AboutMeService,
    public loginService: LoginService) {}

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
    this.aboutMe = this.aboutMeService.getAboutMe();
  }

  toggleShowProjectCmsControls() {
    this.showProjectCmsControls = !this.showProjectCmsControls;
    this.hideAllForms();
  }

  toggleShowAboutMeCmsControls() {
    this.showAboutMeCmsControls = !this.showAboutMeCmsControls;
    this.hideAllForms();
  }

  toggleAddProjectsForm() {
    this.hideAllForms();
    this.showAddProjectsForm = !this.showAddProjectsForm;
  }

  toggleEditProjectsForm() {
    this.hideAllForms();
    this.showEditProjectsForm = !this.showEditProjectsForm;
  }

  toggleDeleteProjectsForm() {
    this.hideAllForms();
    this.showDeleteProjectsForm = !this.showDeleteProjectsForm;
  }

  hideAllForms() {
    this.showAddProjectsForm = false;
    this.showEditProjectsForm = false;
    this.showDeleteProjectsForm = false;
  }

  submitForm(imgUrl: string, imgAltTag: string, name: string, description: string, githubLink: string, linkTitleTag: string) {
    const newProject: Project = new Project(imgUrl, imgAltTag, name, description, githubLink, linkTitleTag);
    this.projectsService.addProject(newProject);
    this.hideAllForms();
  }

  editProjectClicked(projectToEdit) {
    this.selectedProject = projectToEdit;
  }

  cancelProjectEdit() {
    this.selectedProject = null;
  }

  updateProjectClicked(projectToUpdate) {
    this.projectsService.updateProject(projectToUpdate);
    this.cancelProjectEdit();
  }

  deleteProjectClicked(projectToDelete) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectsService.deleteProject(projectToDelete);
    }
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
  }

  runLogout() {
    this.loginService.logout();
  }
}
