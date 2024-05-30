'use client'
import React, { FC, useEffect } from 'react'
import * as docx from "docx-preview"

interface IProps {
    docHref: string
}
const DocViewer: FC<IProps> = ({ docHref }) => {

    const handleCreatePrewiew = () => {
        fetch(docHref, {
            method: 'GET', headers: { 'Content-Type': 'application/docx', }
        }).then((response) => {
            return response.blob()
        }).then((blob) => {
            const container = document.getElementById('container')
            if (container) {
                docx.renderAsync(blob, container)
                    .then((x) => {
                        console.log(x)
                        console.log('buffer')
                    })
            }
        }).catch(err => console.warn(err))
    }

    useEffect(() => {
        if (docHref) {
            handleCreatePrewiew()
        }
    }, [docHref,])

    return (
        <div style={{ flex: 1, width: '50%' }}>
            <div id='container' />
        </div>
    )
}

export default DocViewer