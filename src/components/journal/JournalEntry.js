import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">

      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://konozone.com/wp-content/uploads/2020/07/post_apocolpse.jpg?w=640)'
        }}
      >
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          Oh, hello
        </p>
        <p className="journal__entry-content">
          fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span> Monday </span>
        <h4>28</h4>
      </div>
      
    </div>
  )
}
