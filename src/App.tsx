import { useCallback, useEffect, useState } from "react"
import HangmanDrawing from "./HangmanDrawing"
import HangmanWord from "./HangmanWord"
import Keyboard from "./Keyboard"
import Navbar from "./Navbar"
import words from "./wordList.json"
import "./App.css"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters(current => [...current, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keydown", handler) // 🔥 better than keypress
    return () => document.removeEventListener("keydown", handler)
  }, [addGuessedLetter])

  const resetGame = () => {
    setGuessedLetters([])
    setWordToGuess(getWord())
  }

  return (
    <>
      <Navbar />

      <div className="app-container">
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />

        <div className="keyboard-wrapper">
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter(letter =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>

        <div
          className={`result-text ${
            isWinner ? "winner" : isLoser ? "loser" : ""
          }`}
        >
          {isWinner && "🎉 Winner! 🏆"}
          {isLoser && "Nice Try 👍"}
        </div>

        {(isLoser || isWinner) && (
          <button onClick={resetGame} className="play-button">
            Play Again
          </button>
        )}
      </div>
    </>
  )
}

export default App