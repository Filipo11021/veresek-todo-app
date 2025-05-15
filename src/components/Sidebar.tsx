import { useState } from 'react';
import SearchBtn from '../assets/search.svg';
import PlusBtn from '../assets/plus.svg';
import '../App.css';

function AddBtn({ catHeader }: { catHeader: string }) {
	if (catHeader === 'Kategorie') {
		return (
			<>
				<img
					src={PlusBtn}
					alt='add category button'
					className='w-[15px] h-[15px] cursor-pointer accent-checked-checkbox'
				/>
			</>
		);
	}
}

function CategoryBtn({ catName }: { catName: string }) {
	return (
		<div className='flex h-10'>
			<input type='checkbox' className='m-[11px] w-4.5' />
			<button className='text-white block text-sm bg-none'>{catName}</button>
		</div>
	);
}
function Categories({
	catNames,
	catHeader,
}: {
	catNames: string[];
	catHeader: string;
}) {
	return (
		<div className='mt-8'>
			<div className='flex justify-between w-[216px] items-center pb-4'>
				<p className='text-white text-xl ml-3'>{catHeader}</p>
				<AddBtn catHeader={catHeader} />
			</div>
			{catNames.map((catName, index) => {
				return <CategoryBtn key={index} catName={catName} />;
			})}
		</div>
	);
}
export default function Sidebar() {
	const [catNames, setCatNames] = useState([
		'Wszystkie',
		'Szkoła',
		'Praca',
		'Zadania',
		'Zadania',
	]);
	const StatusNames = ['Wszystkie', 'Do zrobienia', 'Wykonane'];
	return (
		<nav className='px-3 pt-8 pb-5 w-[240px] relative h-screen'>
			<div>
				<div className='relative '>
					<input
						type='text'
						placeholder='Szukaj'
						className='block bg-search-background placeholder-white/60 text-white pr-2 py-4 pl-10 text-[16px] rounded-xl w-[216px]'
					/>
					<img
						src={SearchBtn}
						alt='search icon'
						className='absolute bottom-4.5 left-[12px] cursor-pointer'
					/>
				</div>
				<Categories catNames={catNames} catHeader='Kategorie' />
				<Categories catNames={StatusNames} catHeader='Status' />
			</div>
			<button className='bg-none text-white border border-button-border rounded-xl absolute bottom-5 py-4 w-[90%] cursor-pointer'>
				Wyczyść filtry
			</button>
		</nav>
	);
}
