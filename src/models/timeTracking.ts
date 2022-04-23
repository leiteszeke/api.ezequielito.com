import { Task, TimeTracking } from '../generated/types';
import { HoldedApi } from '../helpers/request';

type TaskInput = {
  duration: number;
  desc?: string;
  costHour: number;
  userId?: string;
  taskId?: string;
};

const all = async (
  projectId: Task['projectId'],
  taskId: Task['id']
): Promise<TimeTracking[]> => {
  const { data: response } = await HoldedApi.get(
    `projects/v1/projects/${projectId}/times`
  );

  return response.filter(
    (tracking: TimeTracking) => tracking.taskId === taskId
  );
};

const create = async (
  projectId: Task['projectId'],
  body: TaskInput
): Promise<TimeTracking> => {
  const { data: response } = await HoldedApi.post(
    `projects/v1/projects/${projectId}/times`,
    body
  );

  return response;
};

export default {
  all,
  create,
};
