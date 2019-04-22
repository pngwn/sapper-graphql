import { RESTDataSource } from 'apollo-datasource-rest';

export class CatFacts extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://cat-fact.herokuapp.com/facts';
  }

  async getRandomFact() {
    return this.get(`/random`);
  }

  async getSpecificFact(factID) {
    return this.get(`/${factID}`);
  }
}