export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTime?: Maybe<Task>;
  createTask?: Maybe<Task>;
};


export type MutationAddTimeArgs = {
  input: TimeInput;
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String'];
  completedTasks: Scalars['Int'];
  date: Scalars['Int'];
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  numberOfTasks: Scalars['Int'];
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  timeTracking?: Maybe<Array<Scalars['Int']>>;
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  sprint?: Maybe<Sprint>;
  sprints?: Maybe<Array<Maybe<Sprint>>>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QuerySprintArgs = {
  id: Scalars['String'];
};


export type QuerySprintsArgs = {
  filters?: InputMaybe<SprintInput>;
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryTasksArgs = {
  filters?: InputMaybe<TasksInput>;
};

export type Sprint = {
  __typename?: 'Sprint';
  _id: Scalars['String'];
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  project?: Maybe<Project>;
  status: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
};

export type SprintInput = {
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<Scalars['String']>>;
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String'];
  createdAt: Scalars['Int'];
  desc?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  listId: Scalars['String'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  project: Project;
  projectId: Scalars['String'];
  reference: Scalars['String'];
  status: Scalars['String'];
  storypoints?: Maybe<Scalars['Int']>;
  times?: Maybe<Array<TimeTracking>>;
  totalTime?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  updatedAt: Scalars['Int'];
};

export type TaskInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type TasksInput = {
  projectId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<Scalars['String']>>;
};

export type TimeInput = {
  projectId: Scalars['String'];
  taskId: Scalars['String'];
  time: Scalars['Int'];
};

export type TimeTracking = {
  __typename?: 'TimeTracking';
  date: Scalars['Int'];
  desc?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  taskId: Scalars['String'];
  timeId: Scalars['String'];
  userId: Scalars['String'];
};
