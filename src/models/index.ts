import { prisma } from '../config/database';
import Project from './project';
import Sprint from './sprint';
import Mails from './mails';
import Task from './task';
import TimeTracking from './timeTracking';

export default {
  Mails,
  Project,
  Sprint,
  Task,
  TimeTracking,
  User: prisma.user,
};
