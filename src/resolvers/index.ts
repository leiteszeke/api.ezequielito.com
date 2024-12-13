import { resolver as accounts } from './accounts';
import { resolver as categories } from './categories';
import { resolver as payees } from './payees';
import { resolver as projects } from './projects';
import { resolver as sprints } from './sprints';
import { resolver as tasks } from './tasks';
import { resolver as transactions } from './transactions';
import { merge } from 'lodash';

const resolverMap = merge(
  accounts,
  categories,
  payees,
  projects,
  sprints,
  tasks,
  transactions
);

export default resolverMap;
