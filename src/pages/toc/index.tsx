import React from 'react'
import * as fs from 'fs'
import style from '../../components/atoms/Toc.module.scss'

export async function getStaticProps() {
    // ファイルタイプの列挙体
    const FileType = {
        File: 'file',
        Directory: 'directory',
        Unknown: 'unknown',
    }

    /**
     * ファイルの種類を取得する
     * @param {string} path パス
     * @return {FileType} ファイルの種類
     */
    const getFileType = (path: string) => {
        try {
            const stat = fs.statSync(path)

            switch (true) {
                case stat.isFile():
                    return FileType.File

                case stat.isDirectory():
                    return FileType.Directory

                default:
                    return FileType.Unknown
            }
        } catch (e) {
            return FileType.Unknown
        }
    }

    /**
     * 指定したディレクトリ配下のすべてのファイルをリストアップする
     * @param {string} dirPath 検索するディレクトリのパス
     * @return {Array<string>} ファイルのパスのリスト
     */
    const listFiles = (dirPath: string) => {
        const ret: string[] = []
        const paths = fs.readdirSync(dirPath)

        paths.forEach((a) => {
            const path = `${dirPath}/${a}`

            switch (getFileType(path)) {
                case FileType.File:
                    ret.push(path)
                    break

                case FileType.Directory:
                    ret.push(...listFiles(path))
                    break

                default:
                /* noop */
            }
        })

        return ret
    }

    // const dirPath = path.resolve(__dirname);
    const dirPath = process.cwd() + '/src/pages'
    const filenames: string[] = listFiles(dirPath)

    return {
        props: {
            filenames,
        },
    }
}

type Props = {
    filenames: string[]
}

export default function TocPage({ filenames }: Props) {
    return (
        <div className={style.tocWrap}>
            <div className={style.tocHead}>画面URL一覧</div>
            <ol className={style.tocList}>
                {filenames.map((item: string, index: number) => {
                    const text = item.match(/.*pages\/(.*)\.tsx/)
                    if (text !== null) {
                        const str = text[1]
                        let result = str
                        if (str.endsWith('index')) {
                            result = str.replace('index', '')
                        }

                        return (
                            <li key={index}>
                                <a href={`/${result}`}>/{result}</a>
                            </li>
                        )
                    }
                })}
            </ol>
        </div>
    )
}
