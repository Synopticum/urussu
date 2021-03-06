import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { SearchResultMapped, map } from 'src/stores/MapStore/ControlsStore/map';
import { SearchResultDto } from 'src/contracts/search';

type Controls = 'search';

export default class ControlsStore {
  private api: AxiosInstance;

  searchData = new AsyncData<SearchResultMapped>();

  selected: Controls;

  resetData(): void {
    this.selected = null;
    this.resetSearchData();
  }

  resetSearchData(): void {
    this.searchData = new AsyncData<SearchResultMapped>();
  }

  search(value: string): void {
    const { api, searchData } = this;
    const options = { api, apiData: searchData, map };

    fetchData<SearchResultDto, SearchResultMapped>(`/search?value=${value}`, options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;
    this.selected = null;

    makeObservable(this, {
      selected: observable,
    });
  }
}
