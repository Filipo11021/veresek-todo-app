import highImportance from '@assets/highImportance.png'
import midImportance from '@assets/midImportance.png'
import lowImportance from '@assets/lowImportance.png'
import todoTaskIcon from '@assets/todoTaskIcon.png'
import doneTaskIcon from '@assets/doneTaskIcon.png'
import MoreOptions from './MoreOptions'
import { TaskItem } from '../types'
import { Dispatch, SetStateAction } from 'react'

function DropdownOption({ imgSrc, label }: { imgSrc: string; label: string }) {
    return (
        <div className="flex items-center">
            <img src={imgSrc} alt="" className="mr-2" />
            <p>{label}</p>
        </div>
    )
}

export function Task({
    task,
    setTasks,
    tasks,
}: {
    task: TaskItem
    setTasks: Dispatch<SetStateAction<TaskItem[]>>
    tasks: TaskItem[]
}) {
    function toggleTaskStatus(taskId: string) {
        setTasks(tasks =>
            tasks.map(task =>
                task.id === taskId ? { ...task, isDone: !task.isDone } : task
            )
        )
    }

    return (
        <div
            className={`flex text-white w-full justify-between bg-task-background px-6 py-4.5 rounded-2xl mb-3 border-task-border border ${
                task.isDone && 'opacity-50'
            } transition`}>
            <div className="flex gap-5">
                <input
                    type="checkbox"
                    className="w-5"
                    onClick={() => toggleTaskStatus(task.id)}
                    checked={task.isDone}
                />
                <div>
                    <h3 className="font-bold">{task.name}</h3>
                    <p className="text-sm">{task.desc}</p>
                </div>
            </div>
            <div className="flex items-center">
                <p className="px-4 pt-2.5 pb-3 rounded-xl mr-3 border-task-category-border border">
                    {task.category}
                </p>
                <div className="rounded-xl border border-task-category-border px-4 pt-2.5 pb-3 mr-3">
                    {task.importance === 'low' && (
                        <DropdownOption imgSrc={lowImportance} label="Niski" />
                    )}
                    {task.importance === 'high' && (
                        <DropdownOption
                            imgSrc={highImportance}
                            label="Wysoki"
                        />
                    )}
                    {task.importance === 'mid' && (
                        <DropdownOption imgSrc={midImportance} label="Średni" />
                    )}
                </div>
                <div className="rounded-xl border border-task-category-border px-4 pt-2.5 pb-3 mr-3">
                    {task.isDone && (
                        <DropdownOption
                            imgSrc={doneTaskIcon}
                            label="Wykonane"
                        />
                    )}
                    {!task.isDone && (
                        <DropdownOption
                            imgSrc={todoTaskIcon}
                            label="Do zrobienia"
                        />
                    )}
                </div>
                <MoreOptions
                    taskId={task.id}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            </div>
        </div>
    )
}
