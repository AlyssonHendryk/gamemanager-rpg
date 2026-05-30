"use client"

import Character from "./components/Character"
import useGameManager from "./hooks/gameManager"

export default function Page() {
  const game = useGameManager()

  const basePath =
    process.env.NODE_ENV === "production"
      ? "/gamemanager-rpg"
      : ""

  return (
    <main className="game-page">
      <h1 className="rpg-title">
        RPG Battle Manager
      </h1>

      <div className="game-layout">
        <section>
          <div className="battle-area rpg-panel">

            <div className="enemy-wrapper">
              <Character
                character={game.enemy}
                image={`${basePath}/vilao.png`}
                position="enemy"
              />
            </div>

            <div className="hero-wrapper">
              <Character
                character={game.hero}
                image={`${basePath}/heroi.png`}
                position="hero"
              />
            </div>
          </div>

          <div className="actions-panel rpg-panel">
            <div className="player-info">
              <div>
                <p>Nível {game.hero.level}</p>
                <p>XP {game.hero.xp}/100</p>
              </div>

              <div>
                Poções: {game.hero.potions}
              </div>
            </div>

            <div className="actions-grid">
              <button onClick={game.attackSword} className="rpg-button">
                Ataque
              </button>

              <button onClick={game.attackMagic} className="rpg-button">
                Magia
              </button>

              <button onClick={game.defend} className="rpg-button">
                Defender
              </button>

              <button onClick={game.usePotion} className="rpg-button">
                Poção
              </button>
            </div>

            {game.gameOver && (
              <button
                onClick={game.resetGame}
                className="rpg-button next-battle"
              >
                Próxima batalha
              </button>
            )}
          </div>
        </section>

        <aside className="history-panel rpg-panel">
          <h2>Histórico</h2>

          <div className="battle-log">
            {game.history.map((item, index) => (
              <p key={index}>
                {item}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}