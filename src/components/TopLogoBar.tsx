// src/components/TopLogoBar.tsx
import * as React from 'react';
import SwitchButton from './SwitchButton';
import { Slider } from '@mui/material';
import { closeFullscreen, openFullscreen, playSound, setVolume, stopSound, testMobile, webpORpng } from '../utils';
import { useAviator } from '../store/aviator';

const HeaderMenu = ({ loaded, scaleFactor, visible, setVisible, maxH, openSettingModal, openHistoryModal, openRuleDialog }: {
    loaded: boolean,
    scaleFactor: number,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    maxH: number,
    openSettingModal: () => void,
    openHistoryModal: () => void,
    openRuleDialog: () => void
}) => {
    const [vol, setValVol] = React.useState<number>(parseInt(localStorage.getItem('slider') || '50'));

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setValVol(newValue as number);
    };

    React.useEffect(() => {
        localStorage.setItem('slider', Math.round(vol).toString());
        setVolume(vol);
    }, [vol]);

    const [musicChecked, setMusicChecked] = React.useState<boolean>((localStorage.getItem('music') || 'true') === 'true');
    const [fxChecked, setFxChecked] = React.useState<boolean>((localStorage.getItem('fx') || 'true') === 'true');

    React.useEffect(() => {
        if (!loaded) return;
        localStorage.setItem('music', musicChecked.toString());
        localStorage.setItem('fx', fxChecked.toString());

        if (musicChecked) playSound("bg");
        else stopSound("bg");

        if (!fxChecked) {
            stopSound("flew");
            stopSound("win");
            stopSound("take");
        }
    }, [musicChecked, fxChecked, loaded]);

    return (
        <div className='menu-wrapper w-80 absolute right-0 top-[100%] z-20 p-1 pr-0 origin-top-right overflow-auto'
            style={{
                display: visible ? "block" : "none",
                scale: `${scaleFactor * 0.035}`,
                maxHeight: maxH / (Math.max(scaleFactor, 0.1) * 0.035)
            }}>
            <div className='menu flex flex-col w-full h-full bg-[#3E3E43] gap-[2px] rounded-md overflow-hidden'>
                {/* Music */}
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-speaker' /></svg>
                        <span>Music</span>
                    </div>
                    <SwitchButton checked={musicChecked} onChange={(_, checked) => setMusicChecked(checked)} />
                </div>
                {/* Sound FX */}
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-music' /></svg>
                        <span>Sound FX</span>
                    </div>
                    <SwitchButton checked={fxChecked} onChange={(_, checked) => setFxChecked(checked)} />
                </div>
                {/* Volume Slider */}
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-volume' /></svg>
                        <span>Volume</span>
                    </div>
                    <Slider
                        onChange={handleVolumeChange}
                        value={vol}
                        max={100} min={0}
                        sx={{
                            width: "160px",
                            color: '#EFAC01',
                            '& .MuiSlider-track': { border: 'none' },
                            '& .MuiSlider-rail': { opacity: 1, backgroundColor: "#3E3E43" },
                            '& .MuiSlider-thumb': {
                                width: 18, height: 18, backgroundColor: '#fff',
                                '&:before': { boxShadow: '0 4px 8px rgba(0,0,0,0.4)' },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': { boxShadow: 'none' },
                            },
                        }}
                        aria-label="Volume" />
                </div>
                <div className='h-1' />
                {/* Game Rules */}
                <div onClick={() => { setVisible(false); openRuleDialog(); }}
                    className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] cursor-pointer transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-game-rules' /></svg>
                        <span>Game Rules</span>
                    </div>
                </div>
                {/* Bet History */}
                <div onClick={() => { setVisible(false); openHistoryModal(); }}
                    className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] cursor-pointer transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-bet-history' /></svg>
                        <span>My Bet History</span>
                    </div>
                </div>
                {/* Chip Settings */}
                <div onClick={() => { setVisible(false); openSettingModal(); }}
                    className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] cursor-pointer transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                        <svg width={20} height={28}><use href='#svg-settings' /></svg>
                        <span>Chips Settings</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TopLogoBar = ({ loaded, setSettingModalOpen, setHistoryModalOpen, setRuleModalOpen }: {
    loaded: boolean,
    setSettingModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setRuleModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { aviatorState } = useAviator();
    const [scale, setScale] = React.useState(1);
    const [w_factor, set_w_factor] = React.useState(0);
    const [showMenu, setShowMenu] = React.useState(false);
    const header_ref = React.useRef<HTMLDivElement>(null);
    const [maxH, setMaxH] = React.useState(100);
    const [fullScreen, setFullScreen] = React.useState(false);

    const handleFullScreen = () => {
        setFullScreen(document.fullscreenElement !== null);
    };

    const handleResize = () => {
        set_w_factor(window.innerWidth > 1024 ? 32 : 24);
        setTimeout(() => { setMaxH(window.innerHeight - (header_ref.current?.clientHeight || 100)); }, 100);
        const { mobile } = testMobile();
        if (mobile) setScale(window.devicePixelRatio / (window.innerWidth > 400 ? 3 : 1));
        else setScale(window.devicePixelRatio);
    };

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        handleFullScreen();
        window.addEventListener('fullscreenchange', handleFullScreen);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('fullscreenchange', handleFullScreen);
        };
    }, []);

    return (
        <div className='w-full bg-[#1C1C1C]/70 text-white relative'>
            <div className='flex justify-between items-center w-full' ref={header_ref} style={{ padding: w_factor / scale * 0.2 }}>
                {/* Logo */}
                <img width={w_factor / scale * 5} src={`${process.env.REACT_APP_ASSETS_IMAGE_URL}${webpORpng}/skyfly-logo.${webpORpng}`} alt="SkyFly Crash Logo" />
                {/* Right side menu */}
                <div className='flex' style={{ gap: w_factor / scale * 0.3 }}>
                    <div className='flex gap-1 sm:gap-2 justify-center items-center' style={{ fontSize: w_factor / scale * 0.5 }}>
                        <svg className="overflow-visible sm:scale-[1.2]" width={w_factor / scale * 0.7} height={w_factor / scale * 0.6}><use href="#svg-wallet" /></svg>
                        {aviatorState.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).substring(1)}
                    </div>
                    <div className='rounded-full bg-[#3E3E43]' style={{ width: 3 }} />
                    <div onClick={() => setShowMenu(prev => !prev)} className='flex flex-col justify-between items-center cursor-pointer rounded-sm hover:bg-[#2e2e2e] transition-all ease-in-out scale-[0
