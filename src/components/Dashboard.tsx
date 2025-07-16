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
export interface TaskWithSetTask extends Task {
	setTasks: Function;
	tasks: Task[];
}
export interface TaskWithCategoryNames extends TaskWithSetTask {
	categoryNames: string[];
	setCategoryNames: Function;
}

function WelcomeHeader() {
	const userName = 'Veresek';
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
	categoryNames,
	setCategoryNames,
	activeCategory,
	setActiveCategory,
}: {
	tasks: Task[];
	setTasks: Function;
	categoryNames: string[];
	setCategoryNames: Function;
	activeCategory: string[];
	setActiveCategory: Function;
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
					categoryNames={categoryNames}
					setCategoryNames={setCategoryNames}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			)}
		</div>
	);
}
function TaskList({
	tasks,
	setTasks,
	activeCategory,
	setCategoryNames,
	categoryNames,
}: {
	tasks: Task[];
	setTasks: Function;
	activeCategory: string[];
	setCategoryNames: Function;
	categoryNames: string[];
}) {
	tasks.sort((a, b) => Number(a.isDone) - Number(b.isDone));
	return (
		<div className='w-full'>
			{tasks.map((task, index) => {
				if (activeCategory.includes(task.category)) {
					return (
						<Task
							id={task.id}
							name={task.name}
							desc={task.desc}
							category={task.category}
							isDone={task.isDone}
							importance={task.importance}
							key={index}
							setTasks={setTasks}
							tasks={tasks}
							categoryNames={categoryNames}
							setCategoryNames={setCategoryNames}
						/>
					);
				}
			})}
		</div>
	);
}

export default function Dashboard({
	tasks,
	setTasks,
	activeCategory,
	setActiveCategory,
	categoryNames,
	setCategoryNames,
}: {
	tasks: Task[];
	setTasks: Function;
	activeCategory: string[];
	setActiveCategory: Function;
	categoryNames: string[];
	setCategoryNames: Function;
}) {
	return (
		<main className='bg-main-section p-8'>
			<WelcomeHeader />
			<DashboardText
				tasks={tasks}
				setTasks={setTasks}
				categoryNames={categoryNames}
				setCategoryNames={setCategoryNames}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
			/>
			<TaskList
				tasks={tasks}
				setTasks={setTasks}
				activeCategory={activeCategory}
				setCategoryNames={setCategoryNames}
				categoryNames={categoryNames}
			/>
		</main>
	);
}
