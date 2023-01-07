import { useEffect, useRef, useState } from "react";
import FlashcardList from './FlashcardList.js'
import './App.css'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'


function App() {
  const [flashcards, setFlashcards] = useState([])
  const [category, setCategory] = useState([])
  
  const categoryEl = useRef()
  const amountEl = useRef()

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

      useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
        .then(res => {
          setCategory(res.data.trivia_categories)
          console.log(res.data)
        })
      },[])
      
 function handleSubmit(e){
  e.preventDefault()
  axios.get('https://opentdb.com/api.php',
  {
    params:
    {amount: amountEl.current.value,
    category: categoryEl.current.value
  }
  }
  )
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
 }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group" >
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {
          category.map(c => {
             return <option value={c.id} key={c.id}>{c.name}</option>
          })
          }
        </select>
      </div>
      <div className="form-group" >
        <label htmlFor="amount">Number of Cards</label>
        <input id="amount" ref={amountEl} step='1' min='1' defaultValue={10} />
      </div>
      <div className="form-group" >
        <button className="btn" >Generate</button>
      </div>
    </form>
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


