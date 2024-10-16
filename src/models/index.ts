import { prisma } from '../config/database';
import Project from './project';
import Sprint from './sprint';
import Task from './task';
import TimeTracking from './timeTracking';

export default {
  Project,
  Sprint,
  Task,
  TimeTracking,
  User: prisma.user,
};
