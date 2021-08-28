import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournarlEntries = () => {

  const {notes} = useSelector(state => state.notes)

  return (
    <div className="journal__entries">
      {
        notes.map(value => (
          <JournalEntry key={ value.id } {...value} />
        ))
      }
    </div>
  )
}
