import React, { useEffect } from 'react';
import styled from 'styled-components';
import { objectsStore, mapStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawCircles } from 'src/components/Map/Container/Circles/draw-circles';

const StyledCircles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

export const Circles: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchData();
    }
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawCircles(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Circles;
