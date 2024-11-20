"use client"
import ErrorMessage from "@/app/components/ErrorMessage"
import Spinner from "@/app/components/Spinner"
import { issueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
// import SimpleMDE from "react-simplemde-editor"
import { z } from "zod"

// Dynamically import SimpleMDE only on the client-side
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,  // Disable SSR for this editor
  loading: () => <Spinner />  // Show a spinner while loading
})

type IssueFormData = z.infer<typeof issueSchema>
interface Props {
  issue?: Issue
}
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState("")
  const [isSubmitBool, setisSubmitBool] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setisSubmitBool(true)
      if (issue) await axios.patch("/api/issues/" + issue?.id, data)
      else await axios.post("/api/issues", data)
      console.log("NEW issue = ")
      console.log(data)

      router.push("/issues")
      router.refresh()
    } catch (error) {
      setisSubmitBool(false)
      setError("An Unexpected Error Occurred")
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        {/* TITLE */}
        <Controller
          name="title"
          control={control}
          defaultValue={issue?.title}
          render={({ field }) => (
            <TextField.Root
              placeholder="Title"
              {...field}
              value={field.value || ""}></TextField.Root>
          )}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Description */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* Submit */}
        <Button disabled={isSubmitBool}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitBool && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
