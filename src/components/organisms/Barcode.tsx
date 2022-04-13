import React from 'react'
import ReactJSBarcode from 'react-jsbarcode'

type Props = {
    value: string
}

const Barcode = ({ value }: Props) => {
    return <ReactJSBarcode value={value} options={{ format: 'code128' }} />
}
export default Barcode
