"use client"
import * as React from "react"
import { Button, Callout, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error , setError ] = useState('')

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{ error }</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log("NEW issue = ")
            console.log(data)
            await axios.post("/api/issues", data)
            router.push("/issues")
          } catch (error) {
            setError("An Unexpected Error Occurred")
          }
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
    </div>
  )
}

export default NewIssuePage
