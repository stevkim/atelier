import React from 'react'
import AnswerList from './AnswerList.jsx';

export default function QuestionEntry() {
  return (
    <div className='question-container'>
      <div className='question-indicator'>
        <span style={{ fontWeight: 'bold' }}>Q: </span>
        <span>What is the question here?</span>
      </div>
      <div className='answer-indicator'>
        <span style={{ fontWeight: 'bold' }}>A: </span>

      </div>
    </div>
  )
}