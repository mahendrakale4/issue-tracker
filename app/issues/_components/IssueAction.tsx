import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"
import React from "react"
import IssueStatusFilter from "../list/IssueStatusFilter"

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter/>
      <Button>
        <Link
          href="/issues/new"
          style={{ color: "white", textDecoration: "null" }}>
          New Issue
        </Link>
      </Button>
    </Flex>
  )
}

export default IssueAction
