export const ICON_MAP = new Map();

function addMapping(values, icon) {
  values.forEach(value => {
    ICON_MAP.set(value, icon);
  });
}
