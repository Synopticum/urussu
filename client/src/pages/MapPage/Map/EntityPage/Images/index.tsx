import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

const StyledImages = styled.div`
  height: 100%;
`;

const CurrentImage = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    border-radius: 10px;
  }
`;

type Props = {
  onClick: () => void;
};

export const Images: React.FC<Props> = observer(({ onClick }) => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  useEffect(() => {
    return (): void => {
      imagesStore.resetData();
    };
  }, []);

  if (!store || !data.images) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          fontSize: '32px',
          background: 'url("/images/common/skyline.svg") no-repeat 50% calc(100% + 5px)',
          backgroundSize: '100%',
        }}
      >
        Фотографии отсутствуют.
      </div>
    );
  }

  imagesStore.selectedImageId = imagesStore.selectedImageId || imagesStore.initialImageId;

  return (
    <StyledImages onClick={onClick}>
      <CurrentImage>
        <img src={imagesStore.selectedImageUrl} alt="" />
      </CurrentImage>

      <Timeline />
    </StyledImages>
  );
});

export default Images;
