import SearchBtn from '../assets/search.svg';
import '../App.css';
import { useState } from 'react';
import { TaskItem } from './types';

function CategoryBtn({
	categoryName,
	setActiveCategory,
	activeCategory,
	essa,
}: {
	categoryName: string;
	setActiveCategory: Function;
	activeCategory: string[];
	essa: string;
}) {
	return (
		<div className='flex h-10'>
			<input
				type='checkbox'
				className='m-[11px] w-4.5'
				id={essa}
				onClick={() => {
					if (activeCategory.includes(categoryName)) {
						const newActiveCategories = activeCategory.filter(
							category => category != categoryName
						);
						setActiveCategory([...newActiveCategories]);
					} else {
						setActiveCategory([...activeCategory, categoryName]);
					}
				}}
				checked={activeCategory.includes(categoryName)}
			/>
			<button className='text-white block text-sm bg-none'>
				{categoryName}
			</button>
		</div>
	);
}
function Categories({
	categoryNames,
	catHeader,
	setActiveCategory,
	activeCategory,
	essa,
}: {
	categoryNames: string[];
	catHeader: string;
	setActiveCategory: Function;
	activeCategory: string[];
	essa: string;
}) {
	return (
		<div className='mt-8'>
			<div className='flex justify-between w-[216px] items-center pb-4'>
				<p className='text-white text-xl ml-3'>{catHeader}</p>
			</div>

			{categoryNames.map((categoryName, index) => {
				return (
					<CategoryBtn
						key={index}
						categoryName={categoryName}
						setActiveCategory={setActiveCategory}
						activeCategory={activeCategory}
						essa={essa}
					/>
				);
			})}
		</div>
	);
}
export default function Sidebar({
	setActiveCategory,
	activeCategory,
	categoryNames,
	setSearchInput,
}: {
	tasks: TaskItem[];
	setActiveCategory: Function;
	activeCategory: string[];
	categoryNames: string[];
	setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [essa, setEssa] = useState('a');
	return (
		<nav className='px-3 pt-8 pb-5 w-[240px] relative h-screen'>
			<div>
				<div className='relative '>
					<input
						type='text'
						placeholder='Szukaj'
						className='block bg-search-background placeholder-white/60 text-white pr-2 py-4 pl-10 text-[16px] rounded-xl w-[216px]'
						onChange={e => {
							setSearchInput(e.target.value);
						}}
					/>
					<img
						src={SearchBtn}
						alt='search icon'
						className='absolute bottom-4.5 left-[12px] cursor-pointer'
					/>
				</div>
				<Categories
					categoryNames={categoryNames}
					catHeader='Kategorie'
					setActiveCategory={setActiveCategory}
					activeCategory={activeCategory}
					essa={essa}
				/>
				<div>
					<p className='text-white text-xl ml-3 mt-10'>Współwłaściciele</p>
					<ol className='text-white ml-6'>
						<li>1. Filipo11: 15%</li>
						<li>2. wapiersk71lidzbark: 11%</li>
						<li>3. fonter_: 10%</li>
						<li>4. nigellapl: 9.99%</li>
					</ol>
					<p className='text-white text-sm ml-3 mt-5'>*1zl -1%</p>
				</div>
			</div>
			<button
				className='bg-none text-white border border-button-border rounded-xl absolute bottom-5 py-4 w-[90%] cursor-pointer'
				onClick={() => {
					setActiveCategory([]);
					setEssa(essa + '1');
				}}>
				Wyczyść filtry
			</button>
		</nav>
	);
}
