import moreBtn from '@assets/more.png';
import editIcon from '@assets/edit.png';
import deleteIcon from '@assets/delete.png';
import { SetStateAction, Dispatch, useState } from 'react';
import { TaskItem } from '../types';
import highImportance from '@assets/highImportance.png';
import midImportance from '@assets/midImportance.png';
import lowImportance from '@assets/lowImportance.png';
import tickIcon from '@assets/tickIcon.png';
import closeIcon from '@assets/closeIcon.png';
import { ImportanceTab } from './CreateTask';

function DrawDropdownOptions({
	taskId,
	setTasks,
	setIsClicked,
}: {
	taskId: string;
	tasks: TaskItem[];
	setTasks: Dispatch<SetStateAction<TaskItem[]>>;
	setIsClicked: Dispatch<SetStateAction<boolean>>;
}) {
	function deleteFunction() {
		setTasks(tasks => tasks.filter(task => task.id !== taskId));
	}

	return (
		<div className='p-2'>
			<div
				key={0}
				onClick={() => {
					{
						setIsClicked(true);
					}
				}}
				className='m-1 flex content-center items-center bg-dropdown-background-subelement p-2 rounded-xl'>
				<div>
					<img src={editIcon} />
				</div>
				<p className='ml-2'>Edytuj</p>
			</div>
			<div
				key={1}
				onClick={() => {
					deleteFunction();
				}}
				className='m-1 flex content-center items-center bg-dropdown-background-subelement p-2 rounded-xl'>
				<div>
					<img src={deleteIcon} />
				</div>
				<p className='ml-2'>Usuń</p>
			</div>
		</div>
	);
}
function editTaskValues(
	taskId: string,
	setTasks: Dispatch<SetStateAction<TaskItem[]>>,
	activeTab: string,
	category: string,
	name: string,
	desc: string
) {
	const editedTask = {
		id: taskId,
		name: name,
		desc: desc,
		category: category,
		isDone: false,
		importance: activeTab,
	};

	setTasks(tasks =>
		tasks.map(task => (task.id === taskId ? editedTask : task))
	);
}

function EditFunction({
	isClicked,
	setIsClicked,
	setTasks,
	taskId,
}: {
	isClicked: boolean;
	setIsClicked: Dispatch<SetStateAction<boolean>>;
	setTasks: Dispatch<SetStateAction<TaskItem[]>>;
	taskId: string;
}) {
	const [activeTab, setActiveTab] = useState('low');
	const [category, setCategory] = useState('Brak');
	const [name, setName] = useState('Brak');
	const [desc, setDesc] = useState('Brak opisu');
	return (
		<div
			className={
				isClicked
					? 'absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/50 backdrop-blur-sm z-10 cursor-default'
					: 'hidden absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/50 backdrop-blur-sm z-10'
			}>
			<div className='absolute top-[50%] left-[50%] bg-creating-task-background -translate-1/2 text-white py-8 px-6 rounded-2xl border-task-border border min-w-[450px]'>
				<h2 className='text-2xl mb-10 font-semibold'>Dodaj nowe zadanie</h2>
				<img
					src={closeIcon}
					alt='close button'
					className='cursor-pointer absolute top-8
					right-6'
					onClick={() => {
						setIsClicked(false);
					}}
				/>
				<div className='mb-6'>
					<p className='mb-2 px-2'>Nazwa</p>
					<input
						required
						type='text'
						placeholder='Edytuj nazwę zadania'
						className='w-full py-4 px-6 rounded-xl bg-task-background'
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className='mb-6'>
					<p className='mb-2 px-2'>Kategoria</p>
					<input
						type='text'
						placeholder='Edytuj nazwę kategorii'
						className='w-full py-4 px-6 rounded-xl bg-task-background'
						onChange={e => {
							setCategory(e.target.value);
						}}
					/>
				</div>
				<div className='mb-6'>
					<p className='mb-2 px-2'>Opis</p>
					<textarea
						placeholder='Edytuj opis zadania'
						className='px-6 py-4 w-full bg-task-background rounded-xl h-[104px] break-all resize-none'
						onChange={e => {
							setDesc(e.target.value);
						}}
					/>
				</div>
				<div className='inline-block mb-10'>
					<p className='mb-2 px-2'>Priorytet</p>
					<div className='flex bg-task-background py-1 px-1 rounded-2xl'>
						<ImportanceTab
							imgSrc={lowImportance}
							label='Niski'
							id='low'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<ImportanceTab
							imgSrc={midImportance}
							label='Średni'
							id='mid'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<ImportanceTab
							imgSrc={highImportance}
							label='Wysoki'
							id='high'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</div>
				<div className='flex content-end w-full justify-end'>
					<button
						className='bg-task-background py-4 px-6 rounded-xl mr-[12px] cursor-pointer'
						onClick={() => {
							setIsClicked(false);
						}}>
						Anuluj
					</button>
					<button
						className='py-4 px-6 bg-profile-icon-background flex items-center  rounded-xl cursor-pointer'
						onClick={() => {
							editTaskValues(taskId, setTasks, activeTab, category, name, desc);
							setIsClicked(false);
						}}>
						<img src={tickIcon} className='w-[18px] h-[13px mr-2.5' />
						Edytuj zadanie
					</button>
				</div>
			</div>
		</div>
	);
}
function DropdownMenu({
	taskId,
	tasks,
	setTasks,
	setIsClicked,
}: {
	taskId: string;
	tasks: TaskItem[];
	setTasks: Dispatch<SetStateAction<TaskItem[]>>;
	setIsClicked: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className='relative -bottom-4 right-20 z-1'>
			<div className='absolute bg-dropdown-background p-1 rounded-2xl w-40'>
				<DrawDropdownOptions
					taskId={taskId}
					tasks={tasks}
					setTasks={setTasks}
					setIsClicked={setIsClicked}
				/>
			</div>
		</div>
	);
}

export default function MoreOptions({
	taskId,
	tasks,
	setTasks,
}: {
	taskId: string;
	tasks: TaskItem[];
	setTasks: Dispatch<SetStateAction<TaskItem[]>>;
}) {
	const [showMore, setShowMore] = useState(false);
	const [isClicked, setIsClicked] = useState<boolean>(false);
	return (
		<div className='cursor-pointer'>
			<img
				src={moreBtn}
				alt='more info'
				className='border-task-category-border border rounded-xl py-3 px-[17px]'
				onClick={() => {
					setShowMore(toggle => !toggle);
				}}
			/>
			{showMore && (
				<DropdownMenu
					taskId={taskId}
					tasks={tasks}
					setTasks={setTasks}
					setIsClicked={setIsClicked}
				/>
			)}
			<EditFunction
				isClicked={isClicked}
				setIsClicked={setIsClicked}
				setTasks={setTasks}
				taskId={taskId}
			/>
		</div>
	);
}
