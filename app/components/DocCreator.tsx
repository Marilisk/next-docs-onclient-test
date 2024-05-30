'use client'
import React, { Dispatch, FC, SetStateAction } from 'react'
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


const saveDataToFile = (data: Uint8Array, fileName: string, setDocHref: Dispatch<SetStateAction<string>>) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob)
    console.log('url', url)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    setDocHref(url)
    a.click()
    // document.body.removeChild(a)
    setTimeout(() => {
        // window.URL.revokeObjectURL(url)
    }, 1000);
};


interface IProps {
    setDocHref: Dispatch<SetStateAction<string>>
}

const DocCreator: FC<IProps> = ({ setDocHref }: IProps) => {

    const handleCreateDoc = async () => {
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
            setDocHref
        )
    }

    return (
        <div style={{flex: 1}}>
            <Button variant="outlined"
                onClick={handleCreateDoc}
            >
                create document
            </Button>
        </div>
    )
}

export default DocCreator