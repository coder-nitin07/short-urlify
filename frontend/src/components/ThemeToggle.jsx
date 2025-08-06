import { useEffect, useState } from "react";

function ThemeToggle(){
    const [ isDark, setIsDark ] = useState(()=>
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(()=>{
        const root = window.document.documentElement;

        if(isDark){
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else{
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    },[ isDark ]);

    return (
        <div className="p-4 flex justify-end">
            <button
                onClick={()=> setIsDark(!isDark) }
                className=" px-4 py-1 rounded-md bg-gray-200 dark:bg-gray-800"
            >
                { isDark ? "🌙" : "☀️" }
            </button>
        </div>
    )
}

export default ThemeToggle;