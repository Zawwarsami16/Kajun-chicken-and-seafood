/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { useState, useCallback, useEffect } from 'react';
import './Chess.css';

// ── Piece Unicode ─────────────────────────────────────────────
const GLYPHS = {
  wK:'♔', wQ:'♕', wR:'♖', wB:'♗', wN:'♘', wP:'♙',
  bK:'♚', bQ:'♛', bR:'♜', bB:'♝', bN:'♞', bP:'♟',
};

// ── Initial board ─────────────────────────────────────────────
const INIT = () => {
  const b = Array(8).fill(null).map(() => Array(8).fill(null));
  const order = ['R','N','B','Q','K','B','N','R'];
  for (let c = 0; c < 8; c++) {
    b[0][c] = 'b'+order[c];
    b[1][c] = 'bP';
    b[6][c] = 'wP';
    b[7][c] = 'w'+order[c];
  }
  return b;
};

const clone = b => b.map(r => [...r]);
const inBounds = (r,c) => r>=0&&r<8&&c>=0&&c<8;
const color = p => p ? p[0] : null;
const opp = c => c==='w' ? 'b' : 'w';
const type = p => p ? p[1] : null;

// ── Raw moves (no check validation) ───────────────────────────
function rawMoves(board, r, c) {
  const p = board[r][c]; if (!p) return [];
  const col = color(p), t = type(p);
  const moves = [];
  const add = (nr, nc) => {
    if (!inBounds(nr,nc)) return false;
    if (color(board[nr][nc]) === col) return false;
    moves.push([nr,nc]);
    return color(board[nr][nc]) === null; // can continue sliding
  };

  if (t==='P') {
    const dir = col==='w' ? -1 : 1;
    const startRow = col==='w' ? 6 : 1;
    if (inBounds(r+dir,c) && !board[r+dir][c]) {
      moves.push([r+dir,c]);
      if (r===startRow && !board[r+2*dir][c]) moves.push([r+2*dir,c]);
    }
    for (const dc of [-1,1]) {
      if (inBounds(r+dir,c+dc) && color(board[r+dir][c+dc])===opp(col))
        moves.push([r+dir,c+dc]);
    }
  }
  else if (t==='N') {
    for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
      add(r+dr,c+dc);
  }
  else if (t==='K') {
    for (const [dr,dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])
      add(r+dr,c+dc);
  }
  else if (t==='R') {
    for (const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]])
      for (let i=1;i<8;i++) { if (!add(r+dr*i,c+dc*i)) break; }
  }
  else if (t==='B') {
    for (const [dr,dc] of [[-1,-1],[-1,1],[1,-1],[1,1]])
      for (let i=1;i<8;i++) { if (!add(r+dr*i,c+dc*i)) break; }
  }
  else if (t==='Q') {
    for (const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]])
      for (let i=1;i<8;i++) { if (!add(r+dr*i,c+dc*i)) break; }
  }
  return moves;
}

// ── Is king in check ──────────────────────────────────────────
function inCheck(board, col) {
  let kr=-1,kc=-1;
  for (let r=0;r<8;r++) for (let c=0;c<8;c++)
    if (board[r][c]===col+'K') { kr=r;kc=c; }
  for (let r=0;r<8;r++) for (let c=0;c<8;c++)
    if (color(board[r][c])===opp(col))
      if (rawMoves(board,r,c).some(([mr,mc])=>mr===kr&&mc===kc)) return true;
  return false;
}

// ── Legal moves (filter out moves leaving king in check) ──────
function legalMoves(board, r, c) {
  const p = board[r][c]; if (!p) return [];
  const col = color(p);
  return rawMoves(board,r,c).filter(([nr,nc]) => {
    const nb = clone(board);
    nb[nr][nc] = p; nb[r][c] = null;
    return !inCheck(nb, col);
  });
}

// ── Has any legal move ────────────────────────────────────────
function hasAnyLegal(board, col) {
  for (let r=0;r<8;r++) for (let c=0;c<8;c++)
    if (color(board[r][c])===col && legalMoves(board,r,c).length>0) return true;
  return false;
}

export default function Chess() {
  const [board, setBoard]       = useState(INIT);
  const [turn, setTurn]         = useState('w');
  const [selected, setSelected] = useState(null);
  const [moves, setMoves]       = useState([]);
  const [status, setStatus]     = useState('');
  const [history, setHistory]   = useState([]);
  const [captured, setCaptured] = useState({ w:[], b:[] });
  const [lastMove, setLastMove] = useState(null);
  const [promotePending, setPromotePending] = useState(null);

  const computeStatus = useCallback((b, t) => {
    const checked = inCheck(b, t);
    const anyLegal = hasAnyLegal(b, t);
    if (!anyLegal && checked) return checked ? `${t==='w'?'Black':'White'} wins by Checkmate! 🏆` : '';
    if (!anyLegal) return 'Stalemate — Draw!';
    if (checked) return `${t==='w'?'White':'Black'} is in Check! ⚠️`;
    return `${t==='w'?'White':'Black'}'s turn`;
  }, []);

  useEffect(() => { setStatus(computeStatus(board, turn)); }, [board, turn, computeStatus]);

  const handleSquare = (r, c) => {
    if (promotePending) return;
    const piece = board[r][c];

    if (selected) {
      const [sr,sc] = selected;
      const isLegal = moves.some(([mr,mc]) => mr===r && mc===c);
      if (isLegal) {
        // Make move
        const nb = clone(board);
        const moved = nb[sr][sc];
        const captured_piece = nb[r][c];
        nb[r][c] = moved; nb[sr][sc] = null;

        // Pawn promotion
        if (type(moved)==='P' && (r===0||r===7)) {
          setBoard(nb); setSelected(null); setMoves([]);
          setLastMove([sr,sc,r,c]);
          setPromotePending({ r, c, col:color(moved), board:nb });
          return;
        }

        if (captured_piece) {
          setCaptured(prev => ({
            ...prev,
            [color(moved)]: [...prev[color(moved)], captured_piece]
          }));
        }

        const next = opp(turn);
        setHistory(h => [...h, { from:[sr,sc], to:[r,c], piece:moved }]);
        setLastMove([sr,sc,r,c]);
        setBoard(nb);
        setTurn(next);
        setSelected(null); setMoves([]);
      } else if (piece && color(piece)===turn) {
        setSelected([r,c]);
        setMoves(legalMoves(board,r,c));
      } else {
        setSelected(null); setMoves([]);
      }
    } else {
      if (piece && color(piece)===turn) {
        setSelected([r,c]);
        setMoves(legalMoves(board,r,c));
      }
    }
  };

  const promote = (pieceType) => {
    if (!promotePending) return;
    const { r, c, col, board: nb } = promotePending;
    nb[r][c] = col + pieceType;
    const next = opp(turn);
    setBoard(nb); setTurn(next);
    setPromotePending(null);
  };

  const reset = () => {
    setBoard(INIT()); setTurn('w'); setSelected(null); setMoves([]);
    setStatus(''); setHistory([]); setCaptured({w:[],b:[]});
    setLastMove(null); setPromotePending(null);
  };

  const isSelected  = (r,c) => selected && selected[0]===r && selected[1]===c;
  const isLegalMove = (r,c) => moves.some(([mr,mc])=>mr===r&&mc===c);
  const isLastMove  = (r,c) => lastMove && (
    (lastMove[0]===r&&lastMove[1]===c)||(lastMove[2]===r&&lastMove[3]===c));

  const isCheckSquare = (r,c) => {
    const p = board[r][c];
    return p && type(p)==='K' && color(p)===turn && inCheck(board,turn);
  };

  return (
    <div className="chess-page page-wrap">
      <div className="chess-bg" />
      <div className="container chess-layout">

        {/* Left panel */}
        <div className="chess-panel">
          <div className="eyebrow">♟ 2-Player Game</div>
          <h1 className="t-display chess-title">
            <span className="t-white">KAJUN</span><br/>
            <span className="t-red">CHESS</span>
          </h1>

          {/* Status */}
          <div className={`chess-status ${status.includes('Check!')?'chess-status--check':''} ${status.includes('wins')?'chess-status--win':''}`}>
            {status || `${turn==='w'?'White':'Black'}'s turn`}
          </div>

          {/* Captured pieces */}
          <div className="chess-captured">
            <div className="chess-cap-row">
              <span className="t-label t-muted" style={{fontSize:8}}>WHITE CAPTURED</span>
              <div className="chess-cap-pieces">
                {captured.w.map((p,i) => <span key={i} className="chess-cap-piece">{GLYPHS[p]}</span>)}
              </div>
            </div>
            <div className="chess-cap-row">
              <span className="t-label t-muted" style={{fontSize:8}}>BLACK CAPTURED</span>
              <div className="chess-cap-pieces">
                {captured.b.map((p,i) => <span key={i} className="chess-cap-piece">{GLYPHS[p]}</span>)}
              </div>
            </div>
          </div>

          {/* Move history */}
          <div className="chess-history">
            <div className="t-label t-muted" style={{fontSize:8,marginBottom:8}}>MOVE HISTORY</div>
            <div className="chess-moves-list">
              {history.length === 0 && <span className="t-muted" style={{fontSize:12}}>No moves yet</span>}
              {history.reduce((acc, h, i) => {
                if (i%2===0) acc.push([h]);
                else acc[acc.length-1].push(h);
                return acc;
              }, []).map((pair, i) => (
                <div key={i} className="chess-move-pair">
                  <span className="chess-move-num">{i+1}.</span>
                  {pair.map((h,j) => (
                    <span key={j} className="chess-move-entry">
                      {GLYPHS[h.piece]}{String.fromCharCode(97+h.from[1])}{8-h.from[0]}→{String.fromCharCode(97+h.to[1])}{8-h.to[0]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-red" style={{width:'100%',justifyContent:'center',marginTop:16}} onClick={reset}>
            New Game
          </button>
          <a href="/kajun-chicken/games" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:10,fontSize:11}}>
            ← Back to Arcade
          </a>
        </div>

        {/* Board */}
        <div className="chess-board-wrap">
          {/* Col labels */}
          <div className="chess-col-labels">
            {['a','b','c','d','e','f','g','h'].map(l => <span key={l}>{l}</span>)}
          </div>

          <div className="chess-board-inner">
            {/* Row labels */}
            <div className="chess-row-labels">
              {[8,7,6,5,4,3,2,1].map(n => <span key={n}>{n}</span>)}
            </div>

            <div className="chess-board">
              {board.map((row, r) => row.map((piece, c) => {
                const light = (r+c)%2===0;
                const sel   = isSelected(r,c);
                const legal = isLegalMove(r,c);
                const last  = isLastMove(r,c);
                const check = isCheckSquare(r,c);
                const hasPiece = !!piece;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={[
                      'chess-sq',
                      light ? 'chess-sq--light' : 'chess-sq--dark',
                      sel   ? 'chess-sq--selected' : '',
                      last  ? 'chess-sq--last' : '',
                      check ? 'chess-sq--check' : '',
                      legal && hasPiece ? 'chess-sq--capture' : '',
                    ].join(' ')}
                    onClick={() => handleSquare(r,c)}
                  >
                    {legal && !hasPiece && <div className="chess-dot" />}
                    {piece && (
                      <span className={`chess-piece chess-piece--${color(piece)}`}>
                        {GLYPHS[piece]}
                      </span>
                    )}
                  </div>
                );
              }))}
            </div>
          </div>
        </div>
      </div>

      {/* Promotion modal */}
      {promotePending && (
        <div className="chess-promo-overlay">
          <div className="chess-promo-modal">
            <div className="t-ui t-white" style={{fontWeight:700,marginBottom:16,fontSize:14,letterSpacing:1}}>
              Promote Pawn — Choose Piece
            </div>
            <div className="chess-promo-choices">
              {['Q','R','B','N'].map(t => (
                <button key={t} className="chess-promo-btn" onClick={() => promote(t)}>
                  {GLYPHS[promotePending.col+t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
