import React, { useEffect, useRef, useState } from 'react'


export default function Flashcard({flashcard}) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight( !flip ? frontHeight:backHeight )
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.option, flip])

  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  },[])

  return (
    <>
    <div 
    className={` card ${flip ? 'flip': ''}`}
    onClick={() => setFlip(!flip)}
    style={{ height:height }}
    >
    
    <div className='front' ref={frontEl}>
      {flashcard.question}
        <div className='front-options'>
          {flashcard.options.map(option => {
              return <div className='front-option' key={option}>{option}</div>
           })}
        </div>
    </div>
    <div className='back' ref={backEl}>{flashcard.answer}</div>
   
    </div>
    
      
    </>
  )
}
