"use client"
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

// const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
//   const router = useRouter()
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleDelete = async () => {
    setError(null)
    try {
      // throw new Error()
      setLoading(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push("/issues/list")
      router.refresh()
    } catch (err) {
      setLoading(false)
      setError("An error occurred while deleting the issue.")
    } 
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="red"
            style={{ width: "100%" }}
            disabled={loading}>
            Delete Issue
            { loading && <Spinner/>}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description
            mt="2"
            style={{
              color: "#666",
              marginBottom: "24px",
            }}>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDelete}>
                {" "}
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={!!error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description
            mt="2"
            style={{ color: "#666" }}></AlertDialog.Description>
          This issue could not be deleted.{" "}
          <Flex justify="end" mt="4">
            <Button
              color="gray"
              variant="soft"
              mt="4"
              onClick={() => setError(null)}>
              {" "}
              OK{" "}
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
