import { useState } from 'react';
import Task from './task/Task';
import AddTaskButton from './task/AddTaskBtn';
import CreateTask from './task/CreateTask';
import wavingHand from '@assets/wavingHand.png';
import profileIcon from '@assets/profile.svg';

export interface Task {
	id: number;
	name: string;
	desc: string;
	category: string;
	isDone: boolean;
	importance: string;
}

function WelcomeHeader() {
	const [userName, setUserName] = useState('Veresek');
	return (
		<div className='rounded-2xl bg-linear-to-br from-start-gradient to-end-gradient flex p-6 gap-2 items-center justify-between'>
			<div className='flex items-center'>
				<img
					src={wavingHand}
					alt='waving hand'
					className='h-8 w-8 mx-[9px] my-4.5'
				/>
				<h1 className='text-white text-[32px] font-bold'>Witaj, {userName}</h1>
			</div>
			<img
				src={profileIcon}
				alt='profile Icon'
				className='bg-profile-icon-background p-[15px] rounded-xl cursor-pointer'
			/>
		</div>
	);
}
function DashboardText({
	tasks,
	setTasks,
}: {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	return (
		<div className='flex items-center justify-between my-10'>
			<div>
				<h2 className='text-white text-2xl font-semibold'>Twoje zadania</h2>
				<p className='text-secondary-text'>
					Poniżej znajdziesz wszystkie swoje zadania, którymi możesz zarządzać
				</p>
			</div>
			<AddTaskButton setIsClicked={setIsClicked} />
			{isClicked && (
				<CreateTask
					setIsClicked={setIsClicked}
					tasks={tasks}
					setTasks={setTasks}
				/>
			)}
		</div>
	);
}
function TaskList({ tasks }: { tasks: Task[] }) {
	console.log(tasks);
	return (
		<div className='w-full'>
			{tasks.map((task, index) => {
				return (
					<Task
						id={task.id}
						name={task.name}
						desc={task.desc}
						category={task.category}
						isDone={task.isDone}
						importance={task.importance}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default function Dashboard() {
	const [tasks, setTasks] = useState([
		{
			id: 1,
			name: 'Zadanie 1',
			desc: 'Opis zadania pierwszego',
			category: 'Szkoła',
			isDone: false,
			importance: 'high',
		},
		{
			id: 2,
			name: 'Zadanie 2',
			desc: 'Opis zadania drugiego',
			category: 'Praca',
			isDone: true,
			importance: 'low',
		},
	]);
	return (
		<main className='bg-main-section p-8'>
			<WelcomeHeader />
			<DashboardText tasks={tasks} setTasks={setTasks} />
			<TaskList tasks={tasks} />
		</main>
	);
}
