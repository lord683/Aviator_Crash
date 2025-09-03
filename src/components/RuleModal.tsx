import * as React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useAviator } from '../store/aviator';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';

export default function RuleModal({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='overflow-y-auto'
        >
            <div className='mx-auto max-w-[600px] text-white mt-10 p-2 overflow-y-auto'>
                <Dialog className='border border-[#7C4F00] rounded-[8px] overflow-hidden bg-black/90'>
                    <div className='h-8 bg-[#E59407] text-black text-[16px] font-bold items-center px-4 flex justify-between'>
                        <span>Game Rules</span>
                        <button onClick={handleClose} className='cursor-pointer'><CloseIcon /></button>
                    </div>
                    <div className='p-6 flex flex-col gap-4'>
                        <p className='text-[14px]'>
                            1. Place your bets before the round starts.<br/>
                            2. The multiplier increases over time.<br/>
                            3. Cash out before the plane flies away to win.<br/>
                            4. If you don't cash out, you lose the bet.<br/>
                        </p>
                        <div className='flex justify-end mt-4'>
                            <Button onClick={handleClose} className='bg-[#E59407] text-black px-4 py-2 rounded'>
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </Modal>
    );
                      }
