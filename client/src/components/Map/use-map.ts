import { LatLngBounds, tileLayer, Map, LatLngBoundsExpression, GridLayer, map } from 'leaflet';
import { RefObject, useEffect } from 'react';
import { mapStore } from 'src/stores';
import { debounce } from 'ts-debounce';
import { useRotatedMarker } from 'src/components/Map/use-rotated-marker';

const createMapInstance = (mapRootNode: HTMLElement): Map => {
  const mapInstance = map(mapRootNode, {});
  mapInstance.doubleClickZoom.disable();

  return mapInstance;
};

const apply1pxGapFix = (): void => {
  if (window.navigator.userAgent.indexOf('Chrome') > -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const originalInitTile = GridLayer.prototype._initTile;
    GridLayer.include({
      _initTile: function (tile: { style: { width: string; height: string } }) {
        originalInitTile.call(this, tile);
        // eslint-disable-next-line react/no-this-in-sfc
        const tileSize = this.getTileSize();
        tile.style.width = tileSize.x + 1 + 'px';
        tile.style.height = tileSize.y + 1 + 'px';
      },
    });
  }
};

const setDefaultSettings = (): void => {
  const { map } = mapStore;
  let lat = 69.65;
  let lng = -20.25;
  let zoom = 5;

  if (location.search) {
    const params = new URLSearchParams(location.search);
    lat = parseInt(params.get('lat'));
    lng = parseInt(params.get('lng'));
    zoom = parseInt(params.get('zoom'));
  } else {
    const url = `?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}&zoom=${zoom}`;
    window.history.replaceState({}, '', url);
  }

  map.setView([lat, lng], zoom);
};

const setMaxBounds = (maxBounds: LatLngBoundsExpression): void => {
  const { map } = mapStore;
  map.setMaxBounds(maxBounds);
};

const initializeTiles = (): void => {
  const { map, width, height, minZoom, maxZoom } = mapStore;
  const bounds = new LatLngBounds(map.unproject([0, height], maxZoom), map.unproject([width, 0], maxZoom));

  tileLayer(`/images/tiles/{z}/{x}/{y}.png.webp`, {
    minZoom: minZoom,
    maxZoom: maxZoom,
    bounds,
    noWrap: true,
  }).addTo(map);
};

const updateUrl = (): void => {
  const { map } = mapStore;
  const { lat, lng } = map.getCenter();
  const zoom = map.getZoom();

  const url = `?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}&zoom=${zoom}`;
  window.history.replaceState({}, '', url);

  mapStore.currentZoom = zoom;
};

const debouncedUpdateUrl = debounce(updateUrl, 50);

const drawMap = (mapRootNode: HTMLElement): Map => {
  const map = createMapInstance(mapRootNode);
  mapStore.map = map;
  const { maxBounds } = mapStore;

  map.on('zoomend', () => updateUrl());
  map.on('drag', () => debouncedUpdateUrl());

  apply1pxGapFix();
  setDefaultSettings();
  setMaxBounds(maxBounds);
  initializeTiles();

  return map;
};

export const useMap = (containerRef: RefObject<HTMLDivElement>): void => {
  const { map } = mapStore;
  useRotatedMarker();

  useEffect(() => {
    if (containerRef.current && !map) {
      mapStore.map = drawMap(containerRef.current);
    }

    return (): void => {
      if (map) {
        mapStore.map = null;
      }
    };
  }, [containerRef.current, map]);
};
