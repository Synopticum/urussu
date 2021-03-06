import styled from 'styled-components';
import React from 'react';
import { ImageMapped } from 'src/stores/MapStore/EntityStore';
import { observer } from 'mobx-react-lite';
import curlyBracesImage from './images/curly.png';
import arrowImage from './images/arrow.svg';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { ImageId } from 'src/contracts/entities';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledYears = styled.ul<{ isDecadeActive: boolean }>`
  position: absolute;
  left: 0;
  bottom: 100%;
  transform: translateX(calc(-50% + 40px));
  display: ${({ isDecadeActive }): string => (isDecadeActive ? 'flex' : 'none')};
  padding-bottom: 15px;
  background: url(${curlyBracesImage}) 50% 100% no-repeat;
  background-size: 500px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    width: 10px;
    height: 10px;
    background: url(${curlyBracesImage}) no-repeat;
    background-size: 500px;
  }

  &::before {
    left: -9px;
    background-position: 0 0;
  }

  &::after {
    right: -9px;
    background-position: 100% 0;
  }
`;

const Image = styled.li`
  position: relative;
  margin: 0 5px;

  &:first-of-type {
    margin-left: -5px;
  }

  &:last-of-type {
    margin-right: -5px;
  }
`;

const YearValue = styled.div<{ isActive: boolean }>`
  position: relative;
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 4px 8px;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 14px;
  color: ${({ isActive }): string => (isActive ? theme.colors.black.a : theme.colors.white.a)};
  background-color: ${({ isActive }): string => (isActive ? theme.colors.white.a : theme.colors.black.a)};
  user-select: none;
`;

const NestedYearValue = styled(YearValue)<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
  border-bottom: 2px solid ${theme.colors.white.a};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: 100%;
    width: 20px;
    height: 17px;
    background: url(${arrowImage}) no-repeat;
    background-size: 20px;
    transform: rotate(90deg);
  }
`;

const changeSelectedImage = (id: ImageId): void => imagesStore.changeSelectedImageId(id);

type Props = {
  images: ImageMapped[];
  isDecadeActive?: boolean;
};

export const Years: React.FC<Props> = observer(({ images, isDecadeActive }) => {
  return (
    <StyledYears isDecadeActive={isDecadeActive}>
      {images.map(({ year, id, image }) => {
        return (
          <Image key={id}>
            <YearValue isActive={imagesStore.isImageActive(id)} onClick={(): void => changeSelectedImage(id)}>
              {year}
            </YearValue>
            {image && (
              <NestedYearValue
                isActive={imagesStore.isImageActive(image.id)}
                onClick={(): void => changeSelectedImage(image.id)}
              >
                {image.year}
              </NestedYearValue>
            )}
          </Image>
        );
      })}
    </StyledYears>
  );
});
