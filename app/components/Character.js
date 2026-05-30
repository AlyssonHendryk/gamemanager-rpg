export default function Character({
  character,
  image,
  position,
}) {
  const hpWidth =
    (character.hp / character.maxHp) * 100

  const manaWidth =
    character.maxMana
      ? (character.mana / character.maxMana) * 100
      : 0

  return (
    <div className="character-box">
      <div className="rpg-panel character-card">
        <div className="character-header">
          <span>{character.name}</span>

          {character.level && (
            <span>Lv. {character.level}</span>
          )}
        </div>

        <div className="hp-bar">
          <div
            className="hp-fill"
            style={{ width: `${hpWidth}%` }}
          />
        </div>

        <p>
          HP {character.hp}/{character.maxHp}
        </p>

        {character.maxMana && (
          <>
            <div className="mana-bar">
              <div
                className="mana-fill"
                style={{ width: `${manaWidth}%` }}
              />
            </div>

            <p>
              MP {character.mana}/{character.maxMana}
            </p>
          </>
        )}
      </div>

      <img
        src={image}
        alt={character.name}
        className={`character-sprite ${position}`}
      />
    </div>
  )
}