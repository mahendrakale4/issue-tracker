import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import { AssigneeSelect } from "./AssigneeSelect"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import { cache } from "react"

interface Props {
  params: { id: string }
}
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

const IssueDetailPage = async ({ params }: Props) => {
  const p = await params
  const issue = await fetchUser(parseInt(p.id))

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
   const p = await params
  const issue = await fetchUser(parseInt(p.id))

  return {
    title: issue?.title!,
    description: "Details of the issue " + issue?.id,
  }
}

export default IssueDetailPage
