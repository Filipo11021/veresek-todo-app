import { Dispatch, SetStateAction, useState } from 'react'
import { Task } from './task/Task'
import AddTaskButton from './task/AddTaskBtn'
import { CreateTask } from './task/CreateTask'
import wavingHand from '@assets/wavingHand.png'
import profileIcon from '@assets/profile.svg'
import { TaskItem } from './types'

function WelcomeHeader() {
    const userName = 'Veresek'
    return (
        <div className="rounded-2xl bg-linear-to-br from-start-gradient to-end-gradient flex p-6 gap-2 items-center justify-between">
            <div className="flex items-center">
                <img
                    src={wavingHand}
                    alt="waving hand"
                    className="h-8 w-8 mx-[9px] my-4.5"
                />
                <h1 className="text-white text-[32px] font-bold">
                    Witaj, {userName}
                </h1>
            </div>
            <img
                src={profileIcon}
                alt="profile Icon"
                className="bg-profile-icon-background p-[15px] rounded-xl cursor-pointer"
            />
        </div>
    )
}
function DashboardText({
    setTasks,
    categoryNames,
    activeCategory,
    setActiveCategories,
}: {
    setTasks: Dispatch<SetStateAction<TaskItem[]>>
    categoryNames: string[]
    activeCategory: string[]
    setActiveCategories: Dispatch<React.SetStateAction<string[]>>
}) {
    const [showCreateTask, setShowCreateTask] = useState<boolean>(false)
    return (
        <div className="flex items-center justify-between my-10">
            <div>
                <h2 className="text-white text-2xl font-semibold">
                    Twoje zadania
                </h2>
                <p className="text-secondary-text">
                    Poniżej znajdziesz wszystkie swoje zadania, którymi możesz
                    zarządzać
                </p>
            </div>
            <AddTaskButton setIsClicked={setShowCreateTask} />
            {showCreateTask && (
                <CreateTask
                    setIsClicked={setShowCreateTask}
                    setTasks={setTasks}
                    categoryNames={categoryNames}
                    activeCategory={activeCategory}
                    setActiveCategories={setActiveCategories}
                />
            )}
        </div>
    )
}
function TaskList({
    tasks,
    setTasks,
    activeCategory,
    searchInput,
}: {
    tasks: TaskItem[]
    setTasks: Dispatch<SetStateAction<TaskItem[]>>
    activeCategory: string[]
    categoryNames: string[]
    searchInput: string
}) {
    console.log(activeCategory)
    return (
        <div className="w-full">
            {tasks.map(task => {
                if (
                    (activeCategory.includes(task.category) &&
                        searchInput == '') ||
                    (task.name.includes(searchInput, 0) && searchInput != '')
                ) {
                    return (
                        <Task
                            task={task}
                            setTasks={setTasks}
                            tasks={tasks}
                            key={task.id}
                        />
                    )
                }
            })}
        </div>
    )
}

export default function Dashboard({
    tasks,
    setTasks,
    activeCategory,
    setActiveCategories,
    categoryNames,
    searchInput,
}: {
    tasks: TaskItem[]
    setTasks: Dispatch<SetStateAction<TaskItem[]>>
    activeCategory: string[]
    setActiveCategories: Dispatch<React.SetStateAction<string[]>>
    categoryNames: string[]
    searchInput: string
}) {
    return (
        <main className="bg-main-section p-8">
            <WelcomeHeader />
            <DashboardText
                setTasks={setTasks}
                categoryNames={categoryNames}
                activeCategory={activeCategory}
                setActiveCategories={setActiveCategories}
            />
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                activeCategory={activeCategory}
                categoryNames={categoryNames}
                searchInput={searchInput}
            />
        </main>
    )
}
