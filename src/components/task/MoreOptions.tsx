import moreBtn from '@assets/more.png';
import editIcon from '@assets/edit.png';
import deleteIcon from '@assets/delete.png';
import { useState } from 'react';

function DrawDropdownOptions({
	deleteFunction,
	editFunction,
}: {
	deleteFunction: Function;
	editFunction: Function;
}) {
	const DropdownOptions = [
		{ imgSrc: editIcon, label: 'Edytuj', action: editFunction },
		{ imgSrc: deleteIcon, label: 'Usuń', action: deleteFunction },
	];
	return DropdownOptions.map((option, index) => {
		return (
			<div
				key={index}
				onClick={() => {
					option.action;
				}}>
				<img src={option.imgSrc} />
				<p>{option.label}</p>
			</div>
		);
	});
}

function DropdownMenu({
	deleteFunction,
	editFunction,
}: {
	deleteFunction: Function;
	editFunction: Function;
}) {
	return (
		<div className='relative -bottom-4'>
			<div className='absolute bg-dropdown-background p-1'>
				<DrawDropdownOptions
					deleteFunction={deleteFunction}
					editFunction={editFunction}
				/>
			</div>
		</div>
	);
}

export default function MoreOptions({
	deleteFunction,
	editFunction,
}: {
	deleteFunction: Function;
	editFunction: Function;
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
				<DropdownMenu
					deleteFunction={deleteFunction}
					editFunction={editFunction}
				/>
			)}
		</div>
	);
}
