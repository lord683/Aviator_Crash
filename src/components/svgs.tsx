import React from 'react';

const SVGs = () => {
  return (
    <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
      {/* Wallet Icon */}
      <symbol id="svg-wallet" viewBox="0 0 24 24">
        <path d="M2 6h20v14H2z" fill="#EFAC01" />
        <path d="M22 6v14H2V6h20m0-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" fill="#fff"/>
      </symbol>

      {/* Speaker / Music Icon */}
      <symbol id="svg-speaker" viewBox="0 0 24 24">
        <path d="M5 9v6h4l5 5V4l-5 5H5z" fill="#fff"/>
      </symbol>

      {/* Music Note / Sound FX Icon */}
      <symbol id="svg-music" viewBox="0 0 24 24">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" fill="#fff"/>
      </symbol>

      {/* Volume Icon */}
      <symbol id="svg-volume" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#fff"/>
      </symbol>

      {/* Game Rules Icon */}
      <symbol id="svg-game-rules" viewBox="0 0 24 24">
        <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h12v2H3v-2zm0 4h12v2H3v-2z" fill="#fff"/>
      </symbol>

      {/* Bet History Icon */}
      <symbol id="svg-bet-history" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm7 2h2v6h-2V7zm-4 4h2v4H8v-4zm8-2h2v6h-2v-6z" fill="#fff"/>
      </symbol>

      {/* Settings / Chips Icon */}
      <symbol id="svg-settings" viewBox="0 0 24 24">
        <path d="M19.43 12.98l1.77-1.03-1.18-2.04-1.77 1.03a6.963 6.963 0 0 0-1.52-.88l-.26-1.91h-2.36l-.26 1.91c-.54.18-1.05.46-1.52.88L5.98 9.91 4.8 11.95l1.77 1.03c-.05.33-.08.67-.08 1s.03.67.08 1l-1.77 1.03 1.18 2.04 1.77-1.03c.47.42.98.7 1.52.88l.26 1.91h2.36l.26-1.91c.54-.18 1.05-.46 1.52-.88l1.77 1.03 1.18-2.04-1.77-1.03c.05-.33.08-.67.08-1s-.03-.67-.08-1zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#fff"/>
      </symbol>
    </svg>
  )
}

export default SVGs;
