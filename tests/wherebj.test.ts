import WhereBJ from '../src/index';

describe('WhereBJ', () => {
  let whereBJ: WhereBJ;

  beforeEach(() => {
    whereBJ = new WhereBJ();
  });

  describe('getDepartments', () => {
    it('should return all departments', () => {
      const departments = whereBJ.getAllDepartments();
      expect(departments).toBeDefined();
      expect(departments.length).toBeGreaterThan(0);
      expect(departments[0]).toHaveProperty('name');
      expect(departments[0]).toHaveProperty('cities');
    });

    it('should find department by id', () => {
      const department = whereBJ.getDepartment('atlantique');
      expect(department).toBeDefined();
      expect(department?.name).toBe('Atlantique');
    });
  });

  describe('getCities', () => {
    it('should return all cities', () => {
      const cities = whereBJ.getAllCities();
      expect(cities).toBeDefined();
      expect(cities.length).toBeGreaterThan(0);
      expect(cities[0]).toHaveProperty('name');
      expect(cities[0]).toHaveProperty('quarters');
    });

    it('should find city by id', () => {
      const city = whereBJ.getCity('cotonou');
      expect(city).toBeDefined();
      expect(city?.name).toBe('Cotonou');
    });

    it('should get cities by department', () => {
      const cities = whereBJ.getCitiesByDepartment('atlantique');
      expect(cities).toBeDefined();
      expect(cities.length).toBeGreaterThan(0);
      expect(cities[0]).toHaveProperty('name');
    });
  });

  describe('getQuarters', () => {
    it('should return quarters for a city', () => {
      const quarters = whereBJ.getCityQuarters('cotonou');
      expect(quarters).toBeDefined();
      expect(quarters.length).toBeGreaterThan(0);
      expect(quarters[0]).toHaveProperty('name');
    });

    it('should return empty array for invalid city', () => {
      const quarters = whereBJ.getCityQuarters('invalid-city');
      expect(quarters).toEqual([]);
    });
  });

  describe('search', () => {
    it('should find quarters by search query', () => {
      const results = whereBJ.searchQuarters('akpakpa');
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('city');
      expect(results[0]).toHaveProperty('quarter');
      expect(results[0].quarter.name.toLowerCase()).toContain('akpakpa');
    });

    it('should return empty array for no matches', () => {
      const results = whereBJ.searchQuarters('nonexistentquarter');
      expect(results).toEqual([]);
    });
  });

  describe('metadata', () => {
    it('should return metadata', () => {
      const metadata = whereBJ.getMetadata();
      expect(metadata).toBeDefined();
      expect(metadata).toHaveProperty('version');
      expect(metadata).toHaveProperty('lastUpdated');
      expect(metadata).toHaveProperty('totalDepartments');
      expect(metadata).toHaveProperty('totalCities');
    });
  });
});