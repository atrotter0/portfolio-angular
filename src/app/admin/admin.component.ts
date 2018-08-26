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

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
  }

  submitForm(imgUrl: string, title: string, description: string, githubLink: string) {
    const newProject: Project = new Project(imgUrl, title, description, githubLink);
    this.projectsService.addProject(newProject);
  }
}
