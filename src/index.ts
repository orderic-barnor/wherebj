import { readFileSync } from 'fs';
import { join } from 'path';

interface Quarter {
  id: string;
  name: string;
  arrondissement?: string;
}

interface City {
  id: string;
  name: string;
  isCommune: boolean;
  quarters: Quarter[];
}

interface Department {
  id: string;
  name: string;
  cities: City[];
}

interface Metadata {
  version: string;
  lastUpdated: string;
  totalDepartments: number;
  totalCities: number;
}

interface LocationData {
  metadata: Metadata;
  departments: Department[];
}

class WhereBJ {
  private data: LocationData;

  constructor() {
    const filePath = join(__dirname, 'data', 'locations.json');
    this.data = JSON.parse(readFileSync(filePath, 'utf8'));
  }

  getAllDepartments(): Department[] {
    return this.data.departments;
  }

  getDepartment(id: string): Department | undefined {
    return this.data.departments.find(dept => dept.id === id);
  }

  getAllCities(): City[] {
    return this.data.departments.flatMap(dept => dept.cities);
  }

  getCity(id: string): City | undefined {
    return this.getAllCities().find(city => city.id === id);
  }

  getCityQuarters(cityId: string): Quarter[] {
    const city = this.getCity(cityId);
    return city ? city.quarters : [];
  }

  searchQuarters(query: string): Array<{city: string, quarter: Quarter}> {
    const results: Array<{city: string, quarter: Quarter}> = [];
    const normalizedQuery = query.toLowerCase();

    this.getAllCities().forEach(city => {
      city.quarters.forEach(quarter => {
        if (quarter.name.toLowerCase().includes(normalizedQuery)) {
          results.push({ city: city.name, quarter });
        }
      });
    });

    return results;
  }

  getMetadata(): Metadata {
    return this.data.metadata;
  }

  getCitiesByDepartment(departmentId: string): City[] {
    const department = this.getDepartment(departmentId);
    return department ? department.cities : [];
  }
}

export default WhereBJ;