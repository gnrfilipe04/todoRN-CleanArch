import { TaskProvider } from './src/presenter/contexts/TaskContext';
import TaskScreen from './src/presenter/screens/TaskScreen';

export default function App() {
  return (
    <TaskProvider>
      <TaskScreen />
    </TaskProvider>
  );
}

