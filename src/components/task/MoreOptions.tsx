import moreBtn from '@assets/more.png';
import editIcon from '@assets/edit.png';
import deleteIcon from '@assets/delete.png';
import { useState } from 'react';
import { Task } from '../Dashboard';
import highImportance from '@assets/highImportance.png';
import midImportance from '@assets/midImportance.png';
import lowImportance from '@assets/lowImportance.png';
import tickIcon from '@assets/tickIcon.png';
import closeIcon from '@assets/closeIcon.png';
import { ImportanceTab } from './CreateTask';

function DrawDropdownOptions({
	taskId,
	tasks,
	setTasks,
	setIsClicked,
}: {
	taskId: number;
	tasks: Task[];
	setTasks: Function;
	setIsClicked: Function;
}) {
	function deleteFunction() {
		let newTasks = [...tasks];
		for (let i = 0; i < newTasks.length; i++) {
			if (newTasks[i].id === taskId) {
				newTasks.splice(i, 1);
				setTasks([...newTasks]);
			}
		}
	}

	return (
		<div className='p-4'>
			<div
				key={0}
				onClick={() => {
					{
						setIsClicked(true);
					}
				}}>
				<img src={editIcon} />
				<p>Edytuj</p>
			</div>
			<div
				key={1}
				onClick={() => {
					deleteFunction();
				}}>
				<img src={deleteIcon} />
				<p>Usuń</p>
			</div>
		</div>
	);
}
function editTaskValues(
	taskId: number,
	setTasks: Function,
	tasks: Task[],
	activeTab: string,
	category: string,
	name: string,
	desc: string
) {
	const oldObjectIndex = tasks.findIndex(task => task.id === taskId);
	const editedTask = {
		id: taskId,
		name: name,
		desc: desc,
		category: category,
		isDone: false,
		importance: activeTab,
	};
	const tempTasks = tasks;
	tempTasks[oldObjectIndex] = editedTask;
	setTasks(tempTasks);
}
function EditFunction({
	isClicked,
	setIsClicked,
	tasks,
	setTasks,
	taskId,
}: {
	isClicked: boolean;
	setIsClicked: Function;
	tasks: Task[];
	setTasks: Function;
	taskId: number;
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
							editTaskValues(
								taskId,
								setTasks,
								tasks,
								activeTab,
								category,
								name,
								desc
							);
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
	taskId: number;
	tasks: Task[];
	setTasks: Function;
	setIsClicked: Function;
}) {
	return (
		<div className='relative -bottom-4 z-1'>
			<div className='absolute bg-dropdown-background p-1'>
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
	categoryNames,
	setCategoryNames,
}: {
	taskId: number;
	tasks: Task[];
	setTasks: Function;
	categoryNames: string[];
	setCategoryNames: Function;
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
				tasks={tasks}
				setTasks={setTasks}
				taskId={taskId}
			/>
		</div>
	);
}
