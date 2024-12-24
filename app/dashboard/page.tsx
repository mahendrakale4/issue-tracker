import prisma from "@/prisma/client"
import { Flex, Grid } from "@radix-ui/themes"
import { IssueChart } from "./IssueChart"
import { IssueSummary } from "./IssueSummary"
import LatestIssue from "./LatestIssue"
import PieChart from "./PieChart"

const DashboardPage = async () => {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });
  return (
    
    <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="20px">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
        <PieChart open={open} inProgress={inProgress} closed={closed}/>
      </Flex>
      <LatestIssue />
    </Grid>
  )
}

export default DashboardPage
