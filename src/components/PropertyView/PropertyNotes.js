import React from 'react'

import TextField from '@material-ui/core/TextField';

export default function PropertyNotes(props) {
  return (
    <div>
      <TextField
            id="outlined-textarea"
            label="Notes"
            multiline
            rows={5}
            variant="outlined"
            value={props.notes}
            fullWidth
            onChange={(event) => {props.setNotes(event.target.value)}}
            style={{ marginTop: '20px' }}
          />
    </div>
  )
}