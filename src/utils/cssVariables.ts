// eslint-disable-next-line import/no-unresolved
import variables from './../styles/variables.scss?inline';

let relaxed = variables.split(' ').slice(1).join(' ');
let strict = relaxed
  // Add " around keys
  .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')
  // Add " around values
  .replace(/(['"])?([#a-z0-9A-Z_%.,]+)(['"])?;/g, '"$1$2";');

// Replace all semicolons with commas, except the last one, remove it at the end
while ((strict.match(/;/g) || []).length > 1) {
  strict = strict.replace(';', ',');
}
strict = strict.replace(';', '');

export const cssVariables = JSON.parse(strict);
