"use client"

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import exp from "constants"
import React, { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  if (isLoading) {
    return <Skeleton></Skeleton>
  }
  if (error) {
    toast.error("Failed to load assignees")
    return null
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserID || ""}
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId || null,
            })
            .catch(() => {
              toast.error("Changes could not be saved.")
            })
        }}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* Use empty string to represent "Unassigned" option */}
            {/* <Select.Item value="">Unassigned</Select.Item> */}
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
            {/* <Select.Item value="1">Mahendra kale</Select.Item> */}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export { AssigneeSelect }