import type { Character } from '../data/characters'
import './CharacterProfile.css'

interface CharacterProfileProps {
  character: Character
  /** 是否顯示角色台詞 */
  showQuote?: boolean
  compact?: boolean
}

export function CharacterProfile({
  character,
  showQuote = true,
  compact = false,
}: CharacterProfileProps) {
  return (
    <div className={`character-profile${compact ? ' character-profile--compact' : ''}`}>
      <div className="character-profile__portrait">
        <div className="character-profile__frame">
          <img
            src={character.image}
            alt={character.imageAlt}
            className="character-profile__image"
            width={720}
            height={1080}
            decoding="async"
          />
        </div>
      </div>

      <div className="character-profile__story">
        <p className="character-profile__role">{character.role}</p>
        <h2 className="character-profile__name">{character.name}</h2>
        <p className="character-profile__tagline">{character.tagline}</p>

        <div className="character-profile__body">
          {character.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {showQuote ? (
          <blockquote className="character-profile__quote">
            <p>{character.quote}</p>
          </blockquote>
        ) : null}
      </div>
    </div>
  )
}
