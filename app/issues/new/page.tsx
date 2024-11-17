"use client"
import * as React from "react"
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        console.log("NEW issue = ")
        console.log(data)
        await axios.post("/api/issues", data)
        router.push("/issues")
      })}>
      {/* TITLE */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField.Root
            placeholder="Title"
            {...field}
            value={field.value || ""}></TextField.Root>
        )}
      />
      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      {/* Submit */}
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
