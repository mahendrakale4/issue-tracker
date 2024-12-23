// 'use client'
import React from "react"
import { Table } from "@radix-ui/themes"
import { IssueStatusBadge, Link } from "@/app/components"
import IssueAction from "../_components/IssueAction"
import prisma from "@/prisma/client"
import { Status } from "@prisma/client"
interface Props {
  searchParams: { status: Status }
}
const IssuePage = async ({ searchParams }: any) => {
  const PromisedsearchParams = await searchParams
  const statuses = Object.values(Status) // ["OPEN", "IN_PROGRESS", "CLOSED"] : undefined
console.log(PromisedsearchParams.status)
  const result = statuses.includes(PromisedsearchParams.status)
    ? PromisedsearchParams.status
    : undefined

console.log(result)
  const issues = await prisma.issue.findMany({
    where: {
      status: result,
    },
  })

  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell> Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                {/* {issue.createdAt.toDateString()} */}
                {/* {new Date(issue.createdAt).toDateString()} */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export const dynamic = "force-dynamic"
export default IssuePage