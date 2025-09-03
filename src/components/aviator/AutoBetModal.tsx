import * as React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SwitchButton from './SwitchButton';
import { useAviator } from '../store/aviator';

const AutoCashItem = ({ msg, index, stops, setStops }: { msg: string, index: number, stops: string[], setStops: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const [enabled, setEnabled] = React.useState(false)
    return (
        <div className='flex justify-between gap-2 items-center w-full'>
            <div className='flex gap-2 items-center'>
                <SwitchButton
                    disabled={false}
                    checked={enabled}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setStops(prev => {
                            const new_val = [...prev]
                            new_val[index] = checked ? "10.00" : "0.00"
                            return new_val
                        })
                        setEnabled(v => !v)
                    }}
                />
                <span>{msg}</span>
            </div>
            <div className={`flex gap-1 ${enabled ? "text-white" : "text-[#737373]"}`}>
                <div className={`flex justify-between items-center text-[20px] w-full h-[27px] bg-black rounded-full px-1 border ${enabled ? "border-white" : "border-[#3E3E3E]"}`} style={{ fontFamily: 'Roboto' }}>
                    <button onClick={() =>
                        setStops(prev => {
                            const new_val = [...prev]
                            new_val[index] = Math.max(10, parseFloat(new_val[index]) - 10).toFixed(2)
                            return new_val
                        })
                    } className={`flex justify-center items-center w-[20px] h-[20px] ${enabled ? "border-white text-white" : "border-[#3E3E3E] text-[#3E3E3E]"} rounded-full border-2`}>-</button>
                    <input
                        disabled={!enabled}
                        value={stops[index]}
                        onChange={(e) => {
                            const val = e.target.value.trim()
                            setStops(prev => {
                                const new_val = [...prev]
                                new_val[index] = val
                                return new_val
                            })
                        }}
                        onKeyDown={(e) => {
                            const val = e.key
                            if (/^[^0-9.]$/.test(val)) e.preventDefault()
                        }}
                        onBlur={(e) => {
                            const val = e.target.value.trim()
                            setStops(prev => {
                                const new_val = [...prev]
                                new_val[index] = isNaN(parseFloat(val)) ? "0.00" : parseFloat(val).toFixed(2)
                                return new_val
                            })
                        }}
                        className={`w-[70px] outline-none bg-black text-center text-[15px] ${enabled ? "text-white" : "text-[#737373]"}`} />
                    <button onClick={() =>
                        setStops(prev => {
                            const new_val = [...prev]
                            new_val[index] = (parseFloat(new_val[index]) + 10).toFixed(2)
                            return new_val
                        })
                    } className={`flex justify-center items-center w-[20px] h-[20px] rounded-full border-2 ${enabled ? "border-white text-white" : "border-[#3E3E3E] text-[#3E3E3E]"}`}>+</button>
                </div>
            </div>
        </div>
    )
}

export default function AutoBetModal({ modalOpen, modalSetOpen, autoPlayingIndex }: { modalOpen: boolean, modalSetOpen: React.Dispatch<React.SetStateAction<boolean>>, autoPlayingIndex: number }) {
    const handleClose = () => modalSetOpen(false);
    const { setAviatorState } = useAviator()
    const [nOfRounds, setNOfRounds] = React.useState(-1)
    const [stops, setStops] = React.useState(["0.00", "0.00", "0.00"])
    
    React.useEffect(() => {
        if (modalOpen) {
            setStops(["0.00", "0.00", "0.00"])
            setNOfRounds(-1)
        }
    }, [modalOpen])
    
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='overflow-y-auto'
        >
            <div className='mx-auto max-w-[600px] text-white mt-10 p-2 overflow-y-auto'>
                <div className='border border-[#7C4
