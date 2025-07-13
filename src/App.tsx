import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
export default function App() {
	let task = JSON.parse(localStorage.getItem('tasks') || '[]');
	const [tasks, setTasks] = useLocalStorage('tasks', task);
	const [activeCategory, setActiveCategory] = useLocalStorage('categories', []);
	let categories = tasks.map((task: { category: any }) => {
		return task.category;
	});
	let x = new Set(categories);
	categories = [...x];
	const [categoryNames, setCategoryNames] = useState(categories);
	return (
		<div className='flex'>
			<Sidebar
				tasks={task}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
				categoryNames={categoryNames}
			/>
			<Dashboard
				setTasks={setTasks}
				tasks={tasks}
				activeCategory={activeCategory}
				categoryNames={categoryNames}
				setCategoryNames={setCategoryNames}
			/>
		</div>
	);
}
