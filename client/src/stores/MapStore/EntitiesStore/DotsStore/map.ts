import { DotDto } from 'src/contracts/entities/dot';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';

export const map = (data: DotDto[]): DotMapped[] => data;
