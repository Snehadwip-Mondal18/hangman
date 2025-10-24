import { useCallback, useEffect, useState } from "react"
import HangmanDrawing from "./HangmanDrawing"
import HangmanWord from "./HangmanWord"
import Keyboard from "./Keyboard"
import words from "./wordList.json"
import Navbar from "./Navbar"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  // const [isGameOver, setIsGameOver] = useState(false);
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

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [addGuessedLetter])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  // useEffect(() => {
  //   if( isWinner || isLoser){
  //     setIsGameOver(true);
  //   }
  // }, [isLoser, isWinner])

  const resetGame = () => {
  setGuessedLetters([])
  setWordToGuess(getWord())
}

  console.log(wordToGuess);
  
  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        {/* <div style={{ fontSize: "2rem", textAlign: "center" }}>
          {isWinner && "Winner! - Refresh to play again"}
          {isLoser && "Nice Try - Refresh to try again"}
        </div> */}
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard
            disabled={isWinner || isLoser}

            activeLetters={guessedLetters.filter(letter =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>


        {/* {isGameOver && (
          <button onClick={resetGame}>Play Again</button>
        )} */}

        <div style={{ fontSize: "4rem", textAlign: "center", color: isWinner? "green" : "red" }}>
          {isWinner && "🎉Winner!👏 🏆"}
          {isLoser && "Nice Try 👍💪"}
        </div>
        {(isLoser || isWinner) && (
          <button onClick={resetGame} 
          style={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
            padding: "1rem",
            fontFamily: "monospace",
            fontWeight: "bold",
            border: "3px solid gray",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          >Play Again</button>
        )}
      </div>
    </>
  )
}

export default App