'use client'
import React, { useState } from 'react'
import DocCreator from './components/DocCreator'
import DocViewer from './components/DocViewer'
import c from "./page.module.scss";


const App = () => {

    const [docHref, setDocHref] = useState('')


    return (
        <main className={c.main}>
            <div>
                <h1>There is the Button</h1>
                <DocCreator setDocHref={setDocHref} />
            </div>
            <div>
                <h1>There will be prewiew</h1>
                <DocViewer docHref={docHref} />
            </div>
        </main>
    )
}

export default App