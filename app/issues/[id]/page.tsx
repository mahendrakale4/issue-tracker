import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import { AssigneeSelect } from "./AssigneeSelect"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const issueId = parseInt(id, 10) // return NaN if not a number
  if (isNaN(issueId)) {
    notFound()
    return
  }
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })

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
  const p = await params;
  const issueId = await parseInt(p.id, 10)
  if (isNaN(issueId)) {
    return {
      title: "Issue Not Found",
      description: "The issue does not exist or the ID is invalid.",
    }
  }
  const issue = await prisma.issue.findUnique({ where: { id: issueId } })
  return {
    title: issue?.title || "Issue Not Found",
    description: "Details of the issue " + (issue?.id || "N/A"),
  }
}

export default IssueDetailPage