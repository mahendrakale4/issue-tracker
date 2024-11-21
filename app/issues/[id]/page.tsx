import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
