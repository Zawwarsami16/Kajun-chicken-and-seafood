/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import './Ludo.css';

// ── Ludo Constants ────────────────────────────────────────────
const COLORS = ['red','blue','green','yellow'];
const COLOR_LABELS = { red:'🔴 Red', blue:'🔵 Blue', green:'🟢 Green', yellow:'🟡 Yellow' };
const COLOR_HEX = { red:'#e53e3e', blue:'#3182ce', green:'#38a169', yellow:'#d69e2e' };

// Safe squares (star positions on standard Ludo)
const SAFE = new Set([1,9,14,22,27,35,40,48]);

// Start squares for each color (the square they enter on a 6)
const HOME_COL_START = { red:0, blue:13, green:26, yellow:39 };
// Final home stretch start positions
const HOME_STRETCH_ENTRY = { red:51, blue:12, green:25, yellow:38 };
// Total path length before home stretch: 52 squares (0-51) + 6 home stretch = 58 positions
// Position 52-57 = home stretch for each color

// Starting board positions (absolute 0-51)
const STARTS = { red:1, blue:14, green:27, yellow:40 };

// Each token tracks: pos (0-57), inBase, inHome
// pos 0 = just placed on board at start
// pos 1-51 = on main board
// pos 52-57 = home column (52=entry, 57=home)

function createToken(color, id) {
  return { color, id, pos:-1, inHome:false }; // pos=-1 means in base
}

const INIT_STATE = () => ({
  tokens: {
    red:    [0,1,2,3].map(i => createToken('red',i)),
    blue:   [0,1,2,3].map(i => createToken('blue',i)),
    green:  [0,1,2,3].map(i => createToken('green',i)),
    yellow: [0,1,2,3].map(i => createToken('yellow',i)),
  },
  turn: 0, // 0=red,1=blue,2=green,3=yellow
  dice: null,
  rolled: false,
  message: 'Red rolls first!',
  winners: [],
  movable: [], // [{color,tokenIdx}]
  extraTurn: false,
});

// Convert relative position to absolute board position
function relToAbs(color, rel) {
  if (rel < 0) return -1; // in base
  const start = STARTS[color];
  return (start + rel - 1) % 52;
}

// Move a token
function moveToken(state, color, tokenIdx, dice) {
  const ns = JSON.parse(JSON.stringify(state));
  const token = ns.tokens[color][tokenIdx];

  // From base with a 6
  if (token.pos === -1) {
    if (dice !== 6) return null;
    token.pos = 0; // enter board
    return ns;
  }

  const newRel = token.pos + dice;

  // Check if entering home stretch
  if (newRel >= 52) {
    const homePos = newRel - 52; // 0-5
    if (homePos > 5) return null; // can't overshoot home
    token.pos = 52 + homePos;
    if (homePos === 5) token.inHome = true;
    return ns;
  }

  // Already in home stretch
  if (token.pos >= 52) {
    const newHomePos = (token.pos - 52) + dice;
    if (newHomePos > 5) return null;
    token.pos = 52 + newHomePos;
    if (newHomePos === 5) token.inHome = true;
    return ns;
  }

  token.pos = newRel;

  // Check capture: if another color token is on same absolute square (not safe)
  const absPos = relToAbs(color, token.pos);
  if (!SAFE.has(absPos)) {
    COLORS.forEach(c => {
      if (c === color) return;
      ns.tokens[c].forEach((t, i) => {
        if (t.pos >= 0 && t.pos < 52) {
          const tAbs = relToAbs(c, t.pos);
          if (tAbs === absPos) {
            ns.tokens[c][i].pos = -1; // send to base
          }
        }
      });
    });
  }

  return ns;
}

// Get movable tokens for current player
function getMovable(state, color, dice) {
  const movable = [];
  state.tokens[color].forEach((token, i) => {
    if (token.inHome) return;
    if (token.pos === -1) { if (dice === 6) movable.push(i); return; }
    if (token.pos >= 52) {
      const newHP = (token.pos - 52) + dice;
      if (newHP <= 5) movable.push(i);
    } else {
      movable.push(i);
    }
  });
  return movable;
}

// Dice face SVG
function DiceFace({ value, rolling }) {
  const dots = {
    1:[[50,50]],
    2:[[25,25],[75,75]],
    3:[[25,25],[50,50],[75,75]],
    4:[[25,25],[75,25],[25,75],[75,75]],
    5:[[25,25],[75,25],[50,50],[25,75],[75,75]],
    6:[[25,22],[75,22],[25,50],[75,50],[25,78],[75,78]],
  };
  const d = value ? dots[value] : [];
  return (
    <svg viewBox="0 0 100 100" className={`dice-svg ${rolling?'dice-rolling':''}`}>
      <rect x="5" y="5" width="90" height="90" rx="18" fill="#f8f4ef" stroke="#ccc" strokeWidth="2"/>
      {d.map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="9" fill="#1a1a1a"/>)}
    </svg>
  );
}

export default function Ludo() {
  const [state, setState] = useState(INIT_STATE);
  const [diceRolling, setDiceRolling] = useState(false);
  const [activePlayers, setActivePlayers] = useState(4);
  const rollRef = useRef(null);

  const currentColor = COLORS[state.turn % 4];

  const rollDice = useCallback(() => {
    if (state.rolled || diceRolling) return;
    if (state.winners.includes(currentColor)) { nextTurn(state); return; }

    setDiceRolling(true);
    // Animate dice
    let count = 0;
    const interval = setInterval(() => {
      setState(s => ({ ...s, dice: Math.floor(Math.random()*6)+1 }));
      count++;
      if (count > 8) {
        clearInterval(interval);
        setDiceRolling(false);
        const finalDice = Math.floor(Math.random()*6)+1;
        setState(s => {
          const movable = getMovable(s, currentColor, finalDice);
          const isExtra = finalDice === 6;
          let msg = `${COLOR_LABELS[currentColor]} rolled a ${finalDice}!`;
          if (movable.length === 0) msg += ' No moves available.';
          else if (movable.length === 1) msg += ' Click your token to move.';
          else msg += ` ${movable.length} tokens can move.`;
          return { ...s, dice:finalDice, rolled:true, movable, message:msg, extraTurn:isExtra };
        });
      }
    }, 80);
  }, [state.rolled, diceRolling, currentColor]);

  const handleTokenClick = useCallback((color, tokenIdx) => {
    if (!state.rolled) return;
    if (color !== currentColor) return;
    if (!state.movable.includes(tokenIdx)) return;

    const newState = moveToken(state, color, tokenIdx, state.dice);
    if (!newState) return;

    // Check win
    const allHome = newState.tokens[color].every(t => t.inHome);
    if (allHome && !newState.winners.includes(color)) {
      newState.winners.push(color);
      newState.message = `🏆 ${COLOR_LABELS[color]} wins! Place ${newState.winners.length}!`;
    }

    // Extra turn on 6 or capture
    const extraTurn = state.extraTurn;
    if (!allHome) {
      newState.rolled = false;
      newState.movable = [];
      if (extraTurn) {
        newState.message = `${COLOR_LABELS[color]} gets another turn! (Rolled 6)`;
      } else {
        const nextIdx = (state.turn + 1) % 4;
        newState.turn = nextIdx;
        newState.message = `${COLOR_LABELS[COLORS[nextIdx]]}'s turn to roll!`;
      }
    } else {
      newState.rolled = false; newState.movable = [];
      const nextIdx = (state.turn + 1) % 4;
      newState.turn = nextIdx;
    }
    newState.extraTurn = false;
    setState(newState);
  }, [state, currentColor]);

  const nextTurn = (s) => {
    const nextIdx = (s.turn + 1) % 4;
    setState({ ...s, turn:nextIdx, rolled:false, dice:null, movable:[], message:`${COLOR_LABELS[COLORS[nextIdx]]}'s turn!` });
  };

  const skipTurn = () => {
    if (!state.rolled || state.movable.length > 0) return;
    nextTurn(state);
  };

  const reset = () => setState(INIT_STATE());

  // Render board
  // Standard Ludo board: 15×15 grid
  // We'll render a simplified but visually accurate board

  const renderBoard = () => {
    // Render tokens for each color at their current positions
    const tokensByAbsPos = {};
    COLORS.forEach(color => {
      state.tokens[color].forEach((token, i) => {
        if (token.pos >= 0 && token.pos < 52) {
          const abs = relToAbs(color, token.pos);
          if (!tokensByAbsPos[abs]) tokensByAbsPos[abs] = [];
          tokensByAbsPos[abs].push({ color, idx: i, token });
        }
      });
    });

    return tokensByAbsPos;
  };

  const tokensByPos = renderBoard();

  // Count tokens at home for each color
  const homeCount = {};
  COLORS.forEach(c => {
    homeCount[c] = state.tokens[c].filter(t => t.inHome).length;
  });

  // Count tokens in base
  const baseCount = {};
  COLORS.forEach(c => {
    baseCount[c] = state.tokens[c].filter(t => t.pos === -1).length;
  });

  // Home stretch tokens
  const homeStretch = {};
  COLORS.forEach(c => {
    homeStretch[c] = state.tokens[c].filter(t => t.pos >= 52 && !t.inHome).map(t => t.pos - 52);
  });

  return (
    <div className="ludo-page page-wrap">
      <div className="ludo-bg" />
      <div className="container ludo-layout">

        {/* Info Panel */}
        <div className="ludo-panel">
          <div className="eyebrow">🎲 4-Player Game</div>
          <h1 className="t-display ludo-title">
            <span className="t-white">KAJUN</span><br/>
            <span className="t-red">LUDO</span>
          </h1>

          {/* Message */}
          <div className={`ludo-msg ${state.extraTurn?'ludo-msg--extra':''}`}>
            {state.message}
          </div>

          {/* Dice */}
          <div className="ludo-dice-area">
            <div className="ludo-dice-wrap">
              <DiceFace value={state.dice} rolling={diceRolling} />
            </div>
            <div style={{flex:1}}>
              <div className="ludo-turn-indicator" style={{background:COLOR_HEX[currentColor]}}>
                {COLOR_LABELS[currentColor]}'s Turn
              </div>
              <button
                className="btn btn-red ludo-roll-btn"
                onClick={rollDice}
                disabled={state.rolled || diceRolling || state.winners.length===4}
                style={{width:'100%',justifyContent:'center',marginTop:8}}
              >
                {diceRolling ? '🎲 Rolling...' : state.rolled ? '✓ Rolled' : '🎲 Roll Dice'}
              </button>
              {state.rolled && state.movable.length === 0 && (
                <button className="btn btn-ghost" onClick={skipTurn}
                  style={{width:'100%',justifyContent:'center',marginTop:6,fontSize:10}}>
                  Skip Turn
                </button>
              )}
            </div>
          </div>

          {/* Scores */}
          <div className="ludo-scores">
            {COLORS.map((c,i) => (
              <div key={c} className={`ludo-score ${currentColor===c?'ludo-score--active':''} ${state.winners.includes(c)?'ludo-score--won':''}`}>
                <div className="ludo-score-dot" style={{background:COLOR_HEX[c]}} />
                <div style={{flex:1}}>
                  <div className="t-ui t-white" style={{fontSize:11,fontWeight:700}}>{COLOR_LABELS[c]}</div>
                  <div style={{fontSize:10,color:'var(--k-muted)'}}>
                    {homeCount[c]}/4 home · {baseCount[c]} in base
                  </div>
                </div>
                {state.winners.indexOf(c) >= 0 && (
                  <span className="t-gold" style={{fontSize:16}}>#{state.winners.indexOf(c)+1}</span>
                )}
              </div>
            ))}
          </div>

          <button className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:12}} onClick={reset}>
            New Game
          </button>
          <a href="/kajun-chicken/games" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:8,fontSize:11}}>
            ← Back to Arcade
          </a>
        </div>

        {/* Ludo Board Visual */}
        <div className="ludo-board-wrap">
          <div className="ludo-board">

            {/* Corner bases */}
            <div className="ludo-corner ludo-corner--red">
              <div className="ludo-base-label">RED</div>
              <div className="ludo-base-tokens">
                {state.tokens.red.map((t,i) => (
                  <div key={i}
                    className={`ludo-token ${t.pos===-1?'ludo-token--base':'ludo-token--out'} ${state.movable.includes(i)&&currentColor==='red'?'ludo-token--movable':''} ${t.inHome?'ludo-token--home':''}`}
                    style={{background:COLOR_HEX.red}}
                    onClick={()=>handleTokenClick('red',i)}
                  >
                    {t.inHome?'★':i+1}
                  </div>
                ))}
              </div>
            </div>

            <div className="ludo-corner ludo-corner--blue">
              <div className="ludo-base-label">BLUE</div>
              <div className="ludo-base-tokens">
                {state.tokens.blue.map((t,i) => (
                  <div key={i}
                    className={`ludo-token ${t.pos===-1?'ludo-token--base':'ludo-token--out'} ${state.movable.includes(i)&&currentColor==='blue'?'ludo-token--movable':''} ${t.inHome?'ludo-token--home':''}`}
                    style={{background:COLOR_HEX.blue}}
                    onClick={()=>handleTokenClick('blue',i)}
                  >
                    {t.inHome?'★':i+1}
                  </div>
                ))}
              </div>
            </div>

            <div className="ludo-corner ludo-corner--green">
              <div className="ludo-base-label">GREEN</div>
              <div className="ludo-base-tokens">
                {state.tokens.green.map((t,i) => (
                  <div key={i}
                    className={`ludo-token ${t.pos===-1?'ludo-token--base':'ludo-token--out'} ${state.movable.includes(i)&&currentColor==='green'?'ludo-token--movable':''} ${t.inHome?'ludo-token--home':''}`}
                    style={{background:COLOR_HEX.green}}
                    onClick={()=>handleTokenClick('green',i)}
                  >
                    {t.inHome?'★':i+1}
                  </div>
                ))}
              </div>
            </div>

            <div className="ludo-corner ludo-corner--yellow">
              <div className="ludo-base-label">YELLOW</div>
              <div className="ludo-base-tokens">
                {state.tokens.yellow.map((t,i) => (
                  <div key={i}
                    className={`ludo-token ${t.pos===-1?'ludo-token--base':'ludo-token--out'} ${state.movable.includes(i)&&currentColor==='yellow'?'ludo-token--movable':''} ${t.inHome?'ludo-token--home':''}`}
                    style={{background:COLOR_HEX.yellow}}
                    onClick={()=>handleTokenClick('yellow',i)}
                  >
                    {t.inHome?'★':i+1}
                  </div>
                ))}
              </div>
            </div>

            {/* Center home */}
            <div className="ludo-center">
              <div className="ludo-center-star">⭐</div>
              <div style={{fontSize:10,color:'var(--k-muted)',marginTop:4}}>HOME</div>
              {/* Show home counts */}
              <div className="ludo-center-counts">
                {COLORS.map(c => homeCount[c]>0 && (
                  <div key={c} className="ludo-center-token" style={{background:COLOR_HEX[c]}}>
                    {homeCount[c]}★
                  </div>
                ))}
              </div>
            </div>

            {/* Path squares — simplified visual representation */}
            <div className="ludo-path-info">
              <div className="t-label t-muted" style={{fontSize:9,marginBottom:12,textAlign:'center'}}>BOARD POSITIONS</div>
              <div className="ludo-positions">
                {COLORS.map(color => {
                  const onBoard = state.tokens[color].filter(t => t.pos >= 0 && t.pos < 52);
                  const inStretch = state.tokens[color].filter(t => t.pos >= 52 && !t.inHome);
                  if (onBoard.length === 0 && inStretch.length === 0) return null;
                  return (
                    <div key={color} className="ludo-pos-row">
                      <div className="ludo-pos-dot" style={{background:COLOR_HEX[color]}}/>
                      <div style={{fontSize:11,color:'var(--k-text)'}}>
                        {onBoard.map(t => `Sq.${t.pos+1}`).join(', ')}
                        {inStretch.map(t => ` 🏠${t.pos-52+1}/6`).join('')}
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
                {Object.values(tokensByPos).every(arr => arr.length === 0) && (
                  <div style={{fontSize:12,color:'var(--k-muted)',textAlign:'center'}}>All tokens in base</div>
                )}
              </div>
            </div>

          </div>

          {/* Instructions */}
          <div className="ludo-instructions">
            <div className="t-label t-muted" style={{fontSize:8,marginBottom:8}}>HOW TO PLAY</div>
            <div className="ludo-rules">
              {[
                '🎲 Roll dice on your turn',
                '6️⃣ Roll a 6 to release a token from base',
                '6️⃣ Rolling 6 gives you an extra turn',
                '💥 Land on opponent = send them home',
                '⭐ Safe squares protect your token',
                '🏠 Get all 4 tokens home to win!',
              ].map((r,i) => <div key={i} className="ludo-rule">{r}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
