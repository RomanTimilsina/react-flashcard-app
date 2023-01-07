import { useEffect, useState } from "react";
import FlashcardList from './FlashcardList.js'
import './App.css'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'


function App() {
  const [flashcards, setFlashcards] = useState([])
  console.log(flashcards)

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      
      setFlashcards(res.data.results.map(perQuestion => {
        
        const question = decodeString(perQuestion.question)
        const answer = perQuestion.correct_answer
        const options = [...perQuestion.incorrect_answers, answer]
        
        
        return {
          id: uuidv4(),
          question: question,
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
       } ))
      })
      },[])
      
 

  return (
    <>
      <div className="container">
        <FlashcardList flashcards = {flashcards} />
      </div>
    </>
  );
}

export default App;

function decodeString(str){
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value
}
