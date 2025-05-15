import moreBtn from '@assets/more.png';
import editIcon from '@assets/edit.png';
import deleteIcon from '@assets/delete.png';
import { useState } from 'react';

function editTask() {}
function deleteTask() {
    
}

function DrawDropdownOptions() {
	const DropdownOptions = [
		{ imgSrc: editIcon, label: 'Edytuj', action: editTask },
		{ imgSrc: deleteIcon, label: 'Usuń', action: deleteTask },
	];
	return DropdownOptions.map((option, index) => {
		return (
			<div key={index} onClick={option.action}>
				<img src={option.imgSrc} />
				<p>{option.label}</p>
			</div>
		);
	});
}

function DropdownMenu() {
	return (
		<div className='relative -bottom-4'>
			<div className='absolute bg-dropdown-background p-1'>
				<DrawDropdownOptions />
			</div>
		</div>
	);
}

export default function MoreOptions() {
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
			{showMore && <DropdownMenu />}
		</div>
	);
}
