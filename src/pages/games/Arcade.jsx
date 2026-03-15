/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
import { Link } from 'react-router-dom';
import './Arcade.css';

const GAMES = [
  {
    id: 'chess',
    title: 'CHESS',
    emoji: '♟️',
    desc: 'Full chess with legal moves, check & checkmate detection. Classic 2-player strategy.',
    players: '2 Players',
    difficulty: 'Strategic',
    color: '#c8102e',
    path: '/games/chess',
  },
  {
    id: 'ludo',
    title: 'LUDO',
    emoji: '🎲',
    desc: 'Roll the dice, race your tokens home! Classic 4-player family fun with captures.',
    players: '2–4 Players',
    difficulty: 'Casual',
    color: '#d4a017',
    path: '/games/ludo',
  },
  {
    id: 'tictactoe',
    title: 'TIC-TAC-TOE',
    emoji: '⭕',
    desc: 'Quick 3-in-a-row battle. First to complete a line wins. Best of 5?',
    players: '2 Players',
    difficulty: 'Quick',
    color: '#3182ce',
    path: '/games/tictactoe',
  },
];

export default function Arcade() {
  return (
    <div className="arcade page-wrap">
      <div className="arcade-bg" />

      <div className="container arcade-inner">
        {/* Header */}
        <div className="arcade-header">
          <div className="eyebrow">While You Wait</div>
          <h1 className="t-display arcade-title">
            <span className="t-white">KAJUN</span><br/>
            <span className="t-red">ARCADE</span>
          </h1>
          <p className="t-muted arcade-sub">
            Family games for the wait. 2-player and 4-player — same screen, maximum fun.
          </p>
        </div>

        {/* Games grid */}
        <div className="arcade-grid">
          {GAMES.map((g, i) => (
            <Link key={g.id} to={g.path} className="game-card">
              <div className="game-card__glow" style={{ background: g.color }} />
              <div className="game-card__emoji">{g.emoji}</div>
              <div className="game-card__title t-display" style={{ color: g.color }}>
                {g.title}
              </div>
              <p className="game-card__desc">{g.desc}</p>
              <div className="game-card__meta">
                <span className="game-card__tag">{g.players}</span>
                <span className="game-card__tag">{g.difficulty}</span>
              </div>
              <div className="game-card__play btn btn-ghost" style={{ justifyContent:'center', marginTop:16, fontSize:11 }}>
                Play Now →
              </div>
            </Link>
          ))}
        </div>

        <div className="arcade-footer">
          <Link to="/menu" className="btn btn-red" style={{ fontSize:11 }}>
            ← Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
