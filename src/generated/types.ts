export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  balance?: Maybe<Scalars['Float']['output']>;
  closed?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  offbudget?: Maybe<Scalars['Boolean']['output']>;
};

export type Category = {
  __typename?: 'Category';
  group_id?: Maybe<Scalars['Boolean']['output']>;
  hidden?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  is_income?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CategoryGroup = {
  __typename?: 'CategoryGroup';
  categories?: Maybe<Array<Maybe<Category>>>;
  hidden?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  is_income?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  service?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTime?: Maybe<Task>;
  createTask?: Maybe<Task>;
  loginUser?: Maybe<User>;
};


export type MutationAddTimeArgs = {
  input: TimeInput;
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};

export type Payee = {
  __typename?: 'Payee';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  rules?: Maybe<Array<Maybe<PayeeRule>>>;
  transfer_act?: Maybe<Scalars['String']['output']>;
};

export type PayeeRule = {
  __typename?: 'PayeeRule';
  actions?: Maybe<Array<Maybe<RuleAction>>>;
  conditions?: Maybe<Array<Maybe<RuleCondition>>>;
  conditionsOp?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  stage?: Maybe<Scalars['String']['output']>;
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String']['output'];
  completedTasks: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  numberOfTasks: Scalars['Int']['output'];
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  timeTracking?: Maybe<Array<Scalars['Int']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts?: Maybe<Array<Maybe<Account>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  categoryGroup?: Maybe<CategoryGroup>;
  categoryGroups?: Maybe<Array<Maybe<CategoryGroup>>>;
  payee?: Maybe<Payee>;
  payees?: Maybe<Array<Maybe<Payee>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  sprint?: Maybe<Sprint>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  transaction?: Maybe<Transaction>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoryGroupArgs = {
  id: Scalars['String']['input'];
};


export type QueryPayeeArgs = {
  id: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};


export type QuerySprintArgs = {
  id: Scalars['String']['input'];
};


export type QuerySprintsArgs = {
  filters?: InputMaybe<SprintInput>;
};


export type QueryTaskArgs = {
  id: Scalars['String']['input'];
};


export type QueryTasksArgs = {
  filters?: InputMaybe<TasksInput>;
};


export type QueryTransactionArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  dateFrom?: InputMaybe<Scalars['String']['input']>;
  dateTo?: InputMaybe<Scalars['String']['input']>;
};

export type RuleAction = {
  __typename?: 'RuleAction';
  field?: Maybe<Scalars['String']['output']>;
  op?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type RuleCondition = {
  __typename?: 'RuleCondition';
  field?: Maybe<Scalars['String']['output']>;
  op?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Sprint = {
  __typename?: 'Sprint';
  _id: Scalars['String']['output'];
  dateFrom?: Maybe<Scalars['String']['output']>;
  dateTo?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  project?: Maybe<Project>;
  status: Scalars['String']['output'];
  tasks?: Maybe<Array<Task>>;
};

export type SprintInput = {
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  listId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  project: Project;
  projectId: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  status: Scalars['String']['output'];
  storypoints?: Maybe<Scalars['Int']['output']>;
  times?: Maybe<Array<TimeTracking>>;
  totalTime?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type TaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type TasksInput = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TimeInput = {
  projectId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
  time: Scalars['Int']['input'];
};

export type TimeTracking = {
  __typename?: 'TimeTracking';
  date: Scalars['Int']['output'];
  desc?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  taskId: Scalars['String']['output'];
  timeId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  account?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Float']['output'];
  category?: Maybe<Scalars['String']['output']>;
  cleared: Scalars['Boolean']['output'];
  date?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imported_id?: Maybe<Scalars['String']['output']>;
  imported_payee?: Maybe<Scalars['String']['output']>;
  is_child: Scalars['Boolean']['output'];
  is_parent: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  payee?: Maybe<Scalars['String']['output']>;
  reconciled: Scalars['Boolean']['output'];
  schedule?: Maybe<Scalars['String']['output']>;
  sort_order: Scalars['Float']['output'];
  starting_balance_flag: Scalars['Boolean']['output'];
  subtransactions?: Maybe<Array<Transaction>>;
  tombstone: Scalars['Boolean']['output'];
  transfer_id?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};
