import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"
import React from "react"

const statusMap: Record<Status, { label: string; color: "red" | "violet" | "green" }> = {
    // Record : Key value pair 
    // here Status = key & value = object with label and color

  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
}


const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
      //   {statusMap[status] is object , so we are accessing  property using .label and .color}
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
} 
export default IssueStatusBadge
