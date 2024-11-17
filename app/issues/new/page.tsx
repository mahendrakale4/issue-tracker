"use client"
import * as React from "react"
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      {/* TITLE */}
      <TextField.Root placeholder="Title">
        <TextField.Slot />
      </TextField.Root>
      {/* Description */}
      <SimpleMDE placeholder="Description" />
      {/* Submit */}
      <Button>Submit New Issue</Button>
    </div>
  )
}


export default NewIssuePage
