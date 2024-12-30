import { __DEFAULT_BACKGROUNDS__ } from "@/assets/backgrounds/desc";
import ColorThief from "color-thief-ts";

const colorThief = new ColorThief();

function _cache(fn: any) {
  const _map = new Map();
  return async (url: string) => {
    if (!_map.has(url)) {
      const res = await fn(url);
      _map.set(url, res);
      return res;
    } else {
      return _map.get(url);
    }
  };
}

async function countColor(imgUrl: string) {
  const url = (__DEFAULT_BACKGROUNDS__ as any)[imgUrl];
  const dominantColor = await colorThief.getColorAsync(url);
  const palette = await colorThief.getPaletteAsync(url, 5);
  return { dominantColor, palette } as any;
}

export const getThemeColor = _cache(countColor);
