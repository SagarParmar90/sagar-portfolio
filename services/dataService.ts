import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../constants';

const STORAGE_KEY = 'sagar_portfolio_data';

// Helper to simulate async database calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DataService {
  private projects: Project[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.projects = JSON.parse(stored);
    } else {
      // Seed with constants if empty
      this.projects = [...PROJECTS];
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
  }

  async getProjects(): Promise<Project[]> {
    await delay(300); // Simulate network latency
    return [...this.projects];
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    await delay(200);
    return this.projects.find(p => p.id === id);
  }

  async saveProject(project: Project): Promise<void> {
    await delay(400);
    const index = this.projects.findIndex(p => p.id === project.id);
    
    if (index >= 0) {
      // Update existing
      this.projects[index] = project;
    } else {
      // Create new
      this.projects.unshift(project); // Add to top
    }
    this.saveToStorage();
  }

  async deleteProject(id: string): Promise<void> {
    await delay(300);
    this.projects = this.projects.filter(p => p.id !== id);
    this.saveToStorage();
  }

  // Helper to get categories
  getCategories(): string[] {
    return Object.values(ProjectCategory);
  }
}

export const dataService = new DataService();