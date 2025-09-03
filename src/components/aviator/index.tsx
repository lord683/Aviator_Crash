// src/components/aviator/index.tsx
import React, { useState, useEffect } from 'react'
import GameBoard from "./GameBoard"
import axios, { AxiosError } from 'axios'
import io from 'socket.io-client'
import { useAviator } from '../../store/aviator'
import AccessDenied from '../AccessDenied'
import { Assets } from 'pixi.js'
import { urls } from '../../utils/urls'
import Splash from '../pixicomp/Splash'
import { Game_Global_Vars, initBet6, loadSound } from '../../utils'
import TopLogoBar from '../TopLogoBar'
import RuleModal from '../RuleModal'          // ✅ Corrected
import SettingModal from '../SettingModal'
import HistoryModal from '../HistoryModal'
// Optional payment modal only if you have it
import PaymentModal from '../PaymentModal'

const SkyFlyCrash = () => {
  const { aviatorState, setAviatorState } = useAviator()
  const [loaded, setLoaded] = useState(false)
  const [openGame, setOpenGame] = useState(false)
  const [bet6, setBet6] = useState<string[]>(initBet6)
  const [ruleModalOpen, setRuleModalOpen] = useState(false)
  const [settingModalOpen, setSettingModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [premiumUnlocked, setPremiumUnlocked] = useState(localStorage.getItem('premium') === 'true')

  // Update global bet value
  useEffect(() => {
    Game_Global_Vars.betValue = [bet6[0], bet6[0]]
  }, [bet6])

  // Load assets, setup API, socket
  useEffect(() => {
    Assets.load(urls).then(() => {
      (async () => {
        const token = new URLSearchParams(window.location.search).get('token') || ""
        if (!token) {
          setAviatorState(prev => ({ ...prev, auth: false }))
          return
        }

        delete axios.defaults.headers.common['Accept']
        axios.defaults.headers.common['token'] = token
        axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://skyfly-crash-api.com"
        axios.defaults.timeout = 20000

        try {
          const configResponse = await axios.post('/api/config')
          const chips = configResponse.data.data.config.chips.slice(0,6).map((item:number) => `${item}`)
          localStorage.setItem('bet6', JSON.stringify(chips))
          Game_Global_Vars.stake = {
            max: configResponse.data.data.maxStake,
            min: configResponse.data.data.minStake
          }
          setAviatorState(prev => ({
            ...prev,
            balance: configResponse.data.data.user.account.balance,
          }))

          const { data: { hash } }: { data: { hash: string } } = await axios.post('/api/user/games/create', {
            game_package_id: "crash",
            client_seed: Math.ceil(Math.random()*99999999)
          })
          Game_Global_Vars.hash = hash

          const socket = io(process.env.REACT_APP_SOCKET_URL || "https://skyfly-crash-socket.com:3001", {
            auth: { token },
            transports: ["websocket"]
          })
          setAviatorState(prev => ({ ...prev, socket, token }))
          socket.on('connect', () => console.log('Connected to SkyFly Crash server!'))
          socket.on('disconnect', () => console.log('Disconnected from SkyFly Crash server!'))

          setLoaded(true)
        } catch(e) {
          if ((e as AxiosError)?.response?.status === 503) {
            document.body.innerHTML = ((e as AxiosError)?.response?.data) as string
            document.body.style.cssText = "color:white"
          }
          setAviatorState(prev => ({ ...prev, auth: false }))
        }
      })()
      loadSound()
    })

    return () => {
      aviatorState.socket?.removeAllListeners()
      aviatorState.socket?.disconnect()
    }
  }, [])

  const handlePaymentSuccess = () => {
    setPremiumUnlocked(true)
    localStorage.setItem('premium', 'true')
    setPaymentOpen(false)
  }

  if (!aviatorState.auth) return <AccessDenied />

  return (
    <>
      <TopLogoBar 
        loaded={loaded} 
        setSettingModalOpen={setSettingModalOpen} 
        setHistoryModalOpen={setHistoryModalOpen} 
        setRuleModalOpen={setRuleModalOpen} 
      />

      {!premiumUnlocked ? (
        <Splash loaded={loaded} setOpenGame={() => setPaymentOpen(true)} />
      ) : (
        openGame && loaded ? <GameBoard bet6={bet6} /> : <Splash loaded={loaded} setOpenGame={setOpenGame} />
      )}

      <RuleModal open={ruleModalOpen} setOpen={setRuleModalOpen} />
      <SettingModal open={settingModalOpen} setOpen={setSettingModalOpen} bet6={{ bet6, setBet6 }} />
      <HistoryModal loaded={loaded} open={historyModalOpen} setOpen={setHistoryModalOpen} />
      
      <PaymentModal 
        open={paymentOpen} 
        onClose={() => setPaymentOpen(false)} 
        onSuccess={handlePaymentSuccess} 
      />
    </>
  )
}

export default SkyFlyCrash
