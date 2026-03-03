import "./App.css"

type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) => {
  return (
    <div className="word-container">
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)

        return (
          <span className="letter-box" key={index}>
            <span
              className={`letter ${
                !isGuessed && reveal ? "reveal-letter" : ""
              }`}
              style={{
                visibility: isGuessed || reveal ? "visible" : "hidden",
              }}
            >
              {letter}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default HangmanWord