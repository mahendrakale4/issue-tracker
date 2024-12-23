import { Flex, Grid } from "@radix-ui/themes"
import { IssueChart } from "./IssueChart"
import { IssueSummary } from "./IssueSummary"
import LatestIssue from "./LatestIssue"

const DashboardPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="20px">
      <Flex direction="column" gap="5">
        <IssueSummary open={15} inProgress={17} closed={19} />
        <IssueChart open={15} inProgress={17} closed={19} />
      </Flex>
      <LatestIssue />
    </Grid>
  )
}

export default DashboardPage
