/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState } from 'react';
import './TicTacToe.css';

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(b) {
  for (const [a,bb,c] of WIN_LINES)
    if (b[a] && b[a]===b[bb] && b[a]===b[c]) return { winner:b[a], line:[a,bb,c] };
  if (b.every(Boolean)) return { winner:'draw' };
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [scores, setScores] = useState({ X:0, O:0, D:0 });
  const [history, setHistory] = useState([]);

  const result = checkWinner(board);

  const play = (i) => {
    if (board[i] || result) return;
    const nb = [...board]; nb[i] = xTurn ? 'X' : 'O';
    setBoard(nb);
    const r = checkWinner(nb);
    if (r) {
      setScores(s => ({
        ...s,
        [r.winner === 'draw' ? 'D' : r.winner]: s[r.winner === 'draw' ? 'D' : r.winner] + 1
      }));
      setHistory(h => [...h, r.winner === 'draw' ? 'Draw' : `${r.winner} wins`]);
    }
    setXTurn(t => !t);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setXTurn(true); };
  const fullReset = () => { reset(); setScores({X:0,O:0,D:0}); setHistory([]); };

  const winLine = result?.line || [];

  return (
    <div className="ttt page-wrap">
      <div className="ttt-bg" />
      <div className="container ttt-layout">
        <div className="ttt-panel">
          <div className="eyebrow">⭕ 2-Player Game</div>
          <h1 className="t-display ttt-title">
            <span className="t-white">TIC</span><br/>
            <span className="t-red">TAC</span><br/>
            <span className="t-gold">TOE</span>
          </h1>

          <div className="ttt-scores">
            {[['X','🔴 Player X'],['D','🤝 Draws'],['O','🔵 Player O']].map(([k,l]) => (
              <div key={k} className={`ttt-score ${!result&&(xTurn?'X':'O')===k?'ttt-score--active':''} ${result?.winner===k?'ttt-score--win':''}`}>
                <div className="ttt-score-label">{l}</div>
                <div className="ttt-score-val t-display t-red">{scores[k]}</div>
              </div>
            ))}
          </div>

          <div className="ttt-status">
            {result
              ? result.winner === 'draw'
                ? "🤝 It's a Draw!"
                : `🏆 Player ${result.winner} Wins!`
              : `Player ${xTurn?'X':'O'}'s turn`
            }
          </div>

          <div style={{display:'flex',gap:10,flexDirection:'column',marginTop:16}}>
            <button className="btn btn-red" style={{justifyContent:'center'}} onClick={reset}>
              {result ? 'Play Again' : 'Reset Board'}
            </button>
            <button className="btn btn-ghost" style={{justifyContent:'center',fontSize:10}} onClick={fullReset}>
              Reset Scores
            </button>
            <a href="/kajun-chicken/games" className="btn btn-ghost" style={{justifyContent:'center',fontSize:11}}>
              ← Back to Arcade
            </a>
          </div>

          {history.length > 0 && (
            <div className="ttt-history">
              <div className="t-label t-muted" style={{fontSize:8,marginBottom:8}}>GAME HISTORY</div>
              {history.slice(-6).reverse().map((h,i) => (
                <div key={i} className="ttt-hist-item">{h}</div>
              ))}
            </div>
          )}
        </div>

        <div className="ttt-board-wrap">
          <div className="ttt-board">
            {board.map((cell, i) => (
              <button
                key={i}
                className={`ttt-cell ${cell?`ttt-cell--${cell.toLowerCase()}`:''} ${winLine.includes(i)?'ttt-cell--win':''} ${!cell&&!result?'ttt-cell--empty':''}`}
                onClick={() => play(i)}
              >
                {cell && (
                  <span className="ttt-mark">
                    {cell === 'X' ? '✕' : '○'}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="ttt-hint">
            Click any empty cell to play
          </div>
        </div>
      </div>
    </div>
  );
}
