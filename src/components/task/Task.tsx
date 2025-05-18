import highImportance from '@assets/highImportance.png';
import midImportance from '@assets/midImportance.png';
import lowImportance from '@assets/lowImportance.png';
import todoTaskIcon from '@assets/todoTaskIcon.png';
import doneTaskIcon from '@assets/doneTaskIcon.png';
import { TaskWithSetTask } from '../Dashboard';
import MoreOptions from './MoreOptions';
function DropdownOption({ imgSrc, label }: { imgSrc: string; label: string }) {
	return (
		<div className='flex items-center'>
			<img src={imgSrc} alt='' className='mr-2' />
			<p>{label}</p>
		</div>
	);
}
export default function CreateTask(task: TaskWithSetTask) {
	function deleteTask() {
		alert('ggdfg');
	}
	function editTask() {}
	return (
		<div className='flex text-white w-full justify-between bg-task-background px-6 py-4.5 rounded-2xl mb-3 border-task-border border'>
			<div>
				<h3 className='font-bold'>{task.name}</h3>
				<p className='text-sm'>{task.desc}</p>
			</div>
			<div className='flex items-center'>
				<p className='px-4 pt-2.5 pb-3 rounded-xl mr-3 border-task-category-border border'>
					{task.category}
				</p>
				<div className='rounded-xl border border-task-category-border px-4 pt-2.5 pb-3 mr-3'>
					{task.importance === 'low' && (
						<DropdownOption imgSrc={lowImportance} label='Niski' />
					)}
					{task.importance === 'high' && (
						<DropdownOption imgSrc={highImportance} label='Wysoki' />
					)}
					{task.importance === 'mid' && (
						<DropdownOption imgSrc={midImportance} label='Średni' />
					)}
				</div>
				<div className='rounded-xl border border-task-category-border px-4 pt-2.5 pb-3 mr-3'>
					{task.isDone && (
						<DropdownOption imgSrc={doneTaskIcon} label='Wykonane' />
					)}
					{!task.isDone && (
						<DropdownOption imgSrc={todoTaskIcon} label='Do zrobienia' />
					)}
				</div>
				<MoreOptions deleteFunction={deleteTask} editFunction={editTask} />
			</div>
		</div>
	);
}
