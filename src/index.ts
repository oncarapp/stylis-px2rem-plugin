/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */

import {
  DECLARATION,
  Middleware,
} from 'stylis';

export type Px2RemPluginOptions = {
  remSize?: number,
  allowList?: string[],
  blockList?: string[],
}

const pxRegexp = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/g;

const stylisPx2RemPlugin: (options?: Px2RemPluginOptions) => Middleware = ({
  remSize = 16,
  allowList,
  blockList,
} = {}) => (
  element,
) => {
  if (element.type === DECLARATION) {
    const declarationHasPx = element.value.match(pxRegexp);

    if (declarationHasPx) {
      if (allowList && !allowList.includes(element.props as string)) return;
      if (blockList && blockList.includes(element.props as string)) return;

      const expression = (element.children as string).replace(pxRegexp, (_match, group) => Number(group) / remSize + 'rem');
      const reconstructedDeclaration = element.props + ':' + expression + ';';

      element.return = reconstructedDeclaration;
    }
  }
};

// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisPx2RemPlugin, 'name', { value: 'stylisPx2RemPlugin' });

export default stylisPx2RemPlugin;
