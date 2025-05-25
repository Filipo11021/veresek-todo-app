import moreBtn from '@assets/more.png';
import editIcon from '@assets/edit.png';
import deleteIcon from '@assets/delete.png';
import { useState } from 'react';
import { Task } from '../Dashboard';

function DrawDropdownOptions({
	taskId,
	Tasks,
	setTasks,
}: {
	taskId: number;
	Tasks: Task[];
	setTasks: Function;
}) {
	function editFunction() {}
	function deleteFunction() {
		let newTasks = [...Tasks];
		for (let i = 0; i < newTasks.length; i++) {
			if (newTasks[i].id === taskId) {
				newTasks.splice(i, 1);
				setTasks([...newTasks]);
				console.log(Tasks);
			}
		}
	}
	const DropdownOptions = [
		{ imgSrc: editIcon, label: 'Edytuj', action: editFunction },
		{ imgSrc: deleteIcon, label: 'Usuń', action: deleteFunction },
	];
	return DropdownOptions.map((option, index) => {
		return (
			<div
				key={index}
				onClick={() => {
					option.action();
				}}>
				<img src={option.imgSrc} />
				<p>{option.label}</p>
			</div>
		);
	});
}

function DropdownMenu({
	taskId,
	Tasks,
	setTasks,
}: {
	taskId: number;
	Tasks: Task[];
	setTasks: Function;
}) {
	return (
		<div className='relative -bottom-4 z-1'>
			<div className='absolute bg-dropdown-background p-1'>
				<DrawDropdownOptions
					taskId={taskId}
					Tasks={Tasks}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
}

export default function MoreOptions({
	taskId,
	Tasks,
	setTasks,
}: {
	taskId: number;
	Tasks: Task[];
	setTasks: Function;
}) {
	const [showMore, setShowMore] = useState(false);
	return (
		<div>
			<img
				src={moreBtn}
				alt='more info'
				className='border-task-category-border border rounded-xl py-3 px-[17px]'
				onClick={() => {
					setShowMore(toggle => !toggle);
				}}
			/>
			{showMore && (
				<DropdownMenu taskId={taskId} Tasks={Tasks} setTasks={setTasks} />
			)}
		</div>
	);
}
