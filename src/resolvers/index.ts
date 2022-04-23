import { resolver as projects } from './projects';
import { merge } from 'lodash';

const resolverMap = merge(projects);

export default resolverMap;
