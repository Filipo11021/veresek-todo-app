import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { TaskItem } from './components/types'
import { useState } from 'react'

export default function App() {
    const [tasks, setTasks] = useLocalStorage<TaskItem[]>('tasks', [])
    const [activeCategories, setActiveCategories] = useLocalStorage<string[]>(
        'categories',
        []
    )
    const [searchInput, setSearchInput] = useState<string>('')
    const uniqueCategories = Array.from(
        new Set(tasks.map(task => task.category))
    )

    return (
        <div className="flex">
            <Sidebar
                tasks={tasks}
                setActiveCategory={setActiveCategories}
                activeCategory={activeCategories}
                categoryNames={uniqueCategories}
                setSearchInput={setSearchInput}
            />
            <Dashboard
                setTasks={setTasks}
                tasks={tasks}
                activeCategory={activeCategories}
                setActiveCategories={setActiveCategories}
                categoryNames={uniqueCategories}
                searchInput={searchInput}
            />
        </div>
    )
}
