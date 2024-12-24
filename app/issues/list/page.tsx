import { IssueStatusBadge, Link } from "@/app/components"
import prisma from "@/prisma/client"
import { Issue, Status } from "@prisma/client"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons"
import { Table } from "@radix-ui/themes"
import NextLink from "next/link"
import IssueAction from "../_components/IssueAction"
import { Pagination } from "../_components/Pagination"

import { Metadata } from "next"
import { Suspense } from "react"

interface Props {
  searchParams: {
    status: Status
    orderBy: keyof Issue
    order: "asc" | "desc"
    page: string
  }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const qp = await searchParams
  const columns: {
    label: string
    value: keyof Issue
    className?: string
  }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(qp.status) ? qp.status : undefined

  const newOrder = qp.order === "asc" ? "desc" : "asc"

  const orderBy = qp.orderBy ? { [qp.orderBy]: qp.order } : undefined

  const page = parseInt(qp.page) || 1
  const pageSize = 8
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({
    where: { status: status },
  })
  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}>
                <NextLink
                  href={{
                    query: {
                      ...qp,
                      orderBy: column.value,
                      order:
                        qp.orderBy === column.value && qp.order === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }}>
                  {column.label}
                  {qp.orderBy !== column.value && (
                    <CaretSortIcon className="inline text-xl ml-2" />
                  )}
                  {qp.orderBy === column.value && (
                    <span className="ml-2">
                      {qp.order === "asc" ? (
                        <ArrowUpIcon className="inline" />
                      ) : (
                        <ArrowDownIcon className="inline" />
                      )}
                    </span>
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
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
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt
                  .toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </Table.Cell>
            </Table.Row>
          ))}

          <Table.Row>
            <Table.Cell>
              <Suspense fallback={null}>
                <Pagination
                  itemCount={issueCount}
                  pageSize={pageSize}
                  currentPage={page}
                />
              </Suspense>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
}
export default IssuesPage
