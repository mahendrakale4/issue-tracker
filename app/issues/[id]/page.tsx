import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import React from "react"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

  const issueId = parseInt(params.id, 10) // return NaN if not a number
  if (isNaN(issueId)) {
    notFound()
    return
  }
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage
