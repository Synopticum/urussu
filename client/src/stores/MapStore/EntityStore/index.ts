import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/objects';
import { map, ObjectMapped } from 'src/stores/MapStore/ObjectsStore/map';

export default class EntityStore {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped[]>();

  fetchApiData(id: string): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<ObjectDto[], ObjectMapped[]>(`/objects/${id}`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped[]>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
