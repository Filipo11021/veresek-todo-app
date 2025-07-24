import PlusBtn from '@assets/plus.svg'
import { Dispatch, SetStateAction } from 'react'

export default function AddTaskBtn({
    setIsClicked,
}: {
    setIsClicked: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <button
            className="flex bg-profile-icon-background px-6 py-4 rounded-xl text-white items-center cursor-pointer"
            onClick={() => {
                setIsClicked(true)
            }}>
            <img
                src={PlusBtn}
                alt="Plus"
                className="mr-2.5 w-[15px] h-[15px]"
            />
            Dodaj zadanie
        </button>
    )
}
