import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';
import { mapStore } from 'src/stores/MapStore';

export const Objects: React.FC = observer(() => {
  const { isDataLoaded, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchApiData();
    }

    return (): void => {
      // Cleaning up is made by <Map />
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) {
      objectsStore.drawObjects();
    }
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Objects;
