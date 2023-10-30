import { Generic } from '../types';
import SendFriendMessage from './SendFriendMessage';
import SendSlackMessage from './SendSlackMessage';

const Tasks: Generic<(payload?: Generic) => Promise<unknown>> = {
  SendFriendMessage,
  SendSlackMessage,
};

export default Tasks;
