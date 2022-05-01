import { resolver as projects } from './projects';
import { resolver as sprints } from './sprints';
import { resolver as tasks } from './tasks';
import { merge } from 'lodash';

const resolverMap = merge(projects, sprints, tasks);

export default resolverMap;
