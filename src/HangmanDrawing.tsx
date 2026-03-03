import "./App.css"

type HangmanDrawingProps = {
  numberOfGuesses: number
}

const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="drawing-container">
      <div className="gallows">
        <div className="top-bar" />
        <div className="vertical-bar" />
        <div className="bottom-bar" />
        <div className="rope" />
      </div>

      {numberOfGuesses > 0 && <div className="head" />}
      {numberOfGuesses > 1 && <div className="body" />}
      {numberOfGuesses > 2 && <div className="right-arm" />}
      {numberOfGuesses > 3 && <div className="left-arm" />}
      {numberOfGuesses > 4 && <div className="right-leg" />}
      {numberOfGuesses > 5 && <div className="left-leg" />}
    </div>
  )
}

export default HangmanDrawing