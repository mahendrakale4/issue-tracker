import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Text, Tooltip } from "@radix-ui/themes"
import Link from "next/link"

// Define the status colors
const STATUS_COLORS: Record<string, "red" | "purple" | "green"> = {
  OPEN: "red",
  IN_PROGRESS: "purple",
  CLOSED: "green",
}

const StatusBadge = ({ status }: { status: string }) => (
  <Tooltip content={status.toLowerCase().replace("_", " ")}>
    <div
      className="flex items-center justify-center hover:scale-110 transition-transform duration-200"
      style={{
        backgroundColor: STATUS_COLORS[status],
        borderRadius: "50%",
        width: "8px",
        height: "8px",
      }}></div>
  </Tooltip>
)

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      assignedToUser: true, // Include assigned user details
    },
  })

  return (
    <Card>
      <Heading size="5" m="3">
        Latest Issues
      </Heading>
      <Flex direction="column" gap="4" m="4" mt="5">
        {issues.map((issue) => (
          <Flex key={issue.id} gap="2" align="center" justify="between">
            <Flex gap="3" align="center" className="w-[90%] flex-1">
              <StatusBadge status={issue.status} />
              <Text
                truncate
                className="max-w-[95%] hover:text-blue-600 transition-colors duration-300" // Add hover effect and smooth transition for text color
              >
                <Link href={`/issues/${issue.id}`} className="block">
                  {issue.title}
                </Link>
              </Text>
            </Flex>
            {issue.assignedToUser && (
              <Avatar
                src={issue.assignedToUser.image || ""}
                fallback={issue.assignedToUser?.name?.charAt(0) || "U"}
                size="1"
                radius="small"
                className="hover:scale-110 transition-transform duration-200" // Avatar hover effect
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}

export default LatestIssues
