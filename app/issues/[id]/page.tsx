import prisma from "@/prisma/client"
import { Box, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const issueId = parseInt(id ,10) // return NaN if not a number
  if (isNaN(issueId)) {
    notFound()
    return
  }
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
