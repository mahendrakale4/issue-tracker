import { Flex, Grid } from "@radix-ui/themes"
import IssueSummary from "./IssueSummary"
import IssueChart from "./IssueChart"
import LatestIssue from "./LatestIssue"

const DashboardPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="20px">
      <Flex direction="column" gap="5">
        <IssueSummary />
        <IssueChart />
      </Flex>
          <LatestIssue />
    </Grid>
  )
}

export default DashboardPage
