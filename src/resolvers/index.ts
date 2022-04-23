import { resolver as projects } from './projects';
import { resolver as tasks } from './tasks';
import { merge } from 'lodash';

const resolverMap = merge(projects, tasks);

export default resolverMap;
