// eslint-disable-next-line import/no-unresolved
import variables from './../styles/variables.scss?inline';

const relaxed = variables.split(' ').slice(1).join(' ').replace(';', '');
const strict = relaxed.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
export const cssVariables = JSON.parse(strict);
