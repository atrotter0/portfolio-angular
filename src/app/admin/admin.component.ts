import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from './../models/project.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectsService]
})
export class AdminComponent implements OnInit {
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  showDeleteForm: boolean = false;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
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

  submitForm(imgUrl: string, title: string, description: string, githubLink: string) {
    const newProject: Project = new Project(imgUrl, title, description, githubLink);
    this.projectsService.addProject(newProject);
  }
}
