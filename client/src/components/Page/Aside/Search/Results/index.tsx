import styled from 'styled-components';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { controlsStore, mapStore } from 'src/stores';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import { color } from 'src/components/GlobalStyle/theme';
import { DotItem, ObjectItem, PathItem } from 'src/components/Page/Aside/Search/Results/Item';

const StyledResults = styled.div`
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    overflow: hidden;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border: 10px solid ${color('white-1')};
    border-top: 0;
    border-bottom: 0;
    transition: background 0.25s;
    background: ${color('black-1')};
  }

  &::-webkit-scrollbar:horizontal {
    height: 24px;
  }

  &::-webkit-scrollbar:vertical {
    width: 24px;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    border-left: none;
    border-right: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${color('black-1')};
  }
`;

const Results: React.FC = observer(() => {
  const { data } = controlsStore.searchData;
  const { map } = mapStore;

  if (!data) {
    return null;
  }

  const openDot = (item: DotMapped): void => {
    const { id, coordinates } = item;
    mapStore.activeEntityId = id;
    map.setView(coordinates, 6);
  };

  const openObject = (item: ObjectMapped): void => {
    const { id, coordinates } = item;
    mapStore.activeEntityId = id;
    map.setView(coordinates[0][0], 6);
  };

  const openPath = (item: PathMapped): void => {
    const { id, coordinates } = item;
    mapStore.activeEntityId = id;
    map.setView(coordinates[0], 6);
  };

  return (
    <StyledResults>
      {data.map(item => {
        switch (item.instanceType) {
          case 'dot':
            return <DotItem item={item as DotMapped} key={item.id} open={openDot} />;

          case 'object':
            return <ObjectItem item={item as ObjectMapped} key={item.id} open={openObject} />;

          case 'path':
            return <PathItem item={item as PathMapped} key={item.id} open={openPath} />;

          case 'circle':
            return <ObjectItem item={item as ObjectMapped} key={item.id} open={openObject} />;
        }

        return null;
      })}
    </StyledResults>
  );
});

export default Results;