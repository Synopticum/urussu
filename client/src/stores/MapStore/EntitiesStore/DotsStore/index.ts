import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dots';
import { DotMapped, map } from 'src/stores/MapStore/EntitiesStore/DotsStore/map';

export default class Index {
  private api: AxiosInstance;

  apiData = new AsyncData<DotMapped[]>();

  fetchApiData(): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<DotDto[], DotMapped[]>('/dots', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}