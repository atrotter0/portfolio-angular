import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { AboutMe } from '../models/aboutMe.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoginService } from '../services/login.service';
import { AboutMeService } from '../services/about-me.service';
import { arrayFromStringList } from '../util/util';
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
  // Project CMS properties
  showProjectCmsControls: boolean = false;
  showAddProjectsForm: boolean = false;
  showEditProjectsForm: boolean = false;
  showDeleteProjectsForm: boolean = false;
  selectedProject = null;
  // AboutMe CMS properties
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
    this.hideAllForms();
    this.hideAllCmsControls();
    this.showProjectCmsControls = !this.showProjectCmsControls;
  }

  toggleShowAboutMeCmsControls() {
    this.hideAllForms();
    this.hideAllCmsControls();
    this.showAboutMeCmsControls = !this.showAboutMeCmsControls;
  }

  toggleAddProjectsForm() {
    this.hideAllForms();
    this.showAddProjectsForm = !this.showAddProjectsForm;
  }

  toggleAddAboutMeForm() {
    this.hideAllForms();
    this.showAddAboutMeForm = !this.showAddAboutMeForm;
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
    this.showAddAboutMeForm = false;
    this.showEditProjectsForm = false;
    this.showDeleteProjectsForm = false;
  }

  hideAllCmsControls() {
    this.showProjectCmsControls = false;
    this.showAboutMeCmsControls = false;
  }

  submitAddProjectForm(
    imgUrl: string,
    imgAltTag: string,
    name: string,
    description: string,
    githubLink: string,
    linkTitleTag: string
  ) {
    const newProject: Project = new Project(imgUrl, imgAltTag, name, description, githubLink, linkTitleTag);
    this.projectsService.addProject(newProject);
    this.hideAllForms();
  }

  submitAddAboutMeForm(
    background: string,
    experience: string,
    education: string,
    proficiencies: string,
    hobbies: string
  ) {
    const arrayOfProficiencies = arrayFromStringList(proficiencies);
    const arrayOfHobbies = arrayFromStringList(hobbies);
    const newAboutMe: AboutMe = new AboutMe(background, experience, education, arrayOfProficiencies, arrayOfHobbies);
    this.aboutMeService.addAboutMe(newAboutMe);
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
