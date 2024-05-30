'use client'
import React from 'react'
import { Button } from '@mui/material'
import createReport from 'docx-templates';

const readFileIntoArrayBuffer = async (fd: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(fd)
    });


const saveDataToFile = (data: Uint8Array, fileName: string) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => {
        window.URL.revokeObjectURL(url)
    }, 1000);
};

async function getDoc() {
    // прописать путь чтобы достучаться до файла своего шаблона хранящегося в public directory 
    const templateFile = await fetch(window.location.origin + '/response-template.docx')
        .then(res => res.blob())
    const template = await readFileIntoArrayBuffer(templateFile)

    const report = await createReport({
        template: template as Uint8Array,
        data: { name: 'Tommy Lavandovsky' }
    })

    saveDataToFile(
        report,
        'report.docx',
    )
}

const DocCreator = () => {

    const handleCreateDoc = () => {
        getDoc()
    }

    return (
        <div>
            <Button variant="outlined"
                onClick={handleCreateDoc}
            >
                create document
            </Button>
        </div>
    )
}

export default DocCreator