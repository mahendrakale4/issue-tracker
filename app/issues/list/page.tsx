// 'use client'
import { IssueStatusBadge, Link } from "@/app/components"
import prisma from "@/prisma/client"
import { Issue, Status } from "@prisma/client"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Table } from "@radix-ui/themes"
import NextLink from "next/link"
import IssueAction from "../_components/IssueAction"


interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc" }
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

  const currentOrder = qp.order || "asc"
  const newOrder = currentOrder === "asc" ? "desc" : "asc"

  const orderBy = qp.orderBy ? { [qp.orderBy]: currentOrder } : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
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
                      order: qp.orderBy === column.value ? newOrder : "asc",
                    },
                  }}>
                  {column.label} <CaretSortIcon className={`inline `} />
                  {qp.orderBy === column.value}
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
export default IssuesPage

// // 'use client'
// import React from "react"
// import { Table } from "@radix-ui/themes"
// import { IssueStatusBadge, Link } from "@/app/components"
// import NextLink from "next/link"
// import IssueAction from "../_components/IssueAction"
// import prisma from "@/prisma/client"
// import { Issue, Status } from "@prisma/client"
// import { ArrowUpIcon } from "@radix-ui/react-icons"
// interface Props {
//   searchParams: { status: Status; orderBy: keyof Issue }
// }

// const IssuesPage = async ({ searchParams }: Props) => {
//   const columns: {
//     label: string
//     value: keyof Issue
//     className?: string
//   }[] = [
//     { label: "Issue", value: "title" },
//     {
//       label: "Status",
//       value: "status",
//       className: "hidden md:table-cell",
//     },
//     {
//       label: "Created",
//       value: "createdAt",
//       className: "hidden md:table-cell",
//     },
//   ]

//   const PromisedsearchParams = await searchParams
//   const statuses = Object.values(Status) // ["OPEN", "IN_PROGRESS", "CLOSED"] : undefined
//   const result = statuses.includes(PromisedsearchParams.status)
//     ? PromisedsearchParams.status
//     : undefined

//   const orderBy = PromisedsearchParams.orderBy
//     ? { [PromisedsearchParams.orderBy]: "asc" }
//     : undefined

//   const issues = await prisma.issue.findMany({
//     where: {
//       status: result,
//     },
//     orderBy: {
//       [orderBy]: "asc",
//     },
//   })

//   return (
//     <div>
//       <IssueAction />
//       <Table.Root variant="surface">
//         <Table.Header>
//           <Table.Row>
//             {columns.map((column) => (
//               <Table.ColumnHeaderCell key={column.value}>
//                 <NextLink
//                   href={{
//                     query: { ...PromisedsearchParams, orderBy: column.value },
//                   }}>
//                   {column.label}
//                 </NextLink>
//                 {column.value === PromisedsearchParams.orderBy && (
//                   <ArrowUpIcon className="inline" />
//                 )}
//               </Table.ColumnHeaderCell>
//             ))}
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//           {issues.map((issue) => (
//             <Table.Row key={issue.id}>
//               <Table.Cell>
//                 <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
//                 <div className="block md:hidden">
//                   <IssueStatusBadge status={issue.status} />
//                 </div>
//               </Table.Cell>
//               <Table.Cell className=" hidden md:table-cell">
//                 <IssueStatusBadge status={issue.status} />
//               </Table.Cell>
//               <Table.Cell className=" hidden md:table-cell">
//                 {/* {issue.createdAt.toDateString()} */}
//                 {/* {new Date(issue.createdAt).toDateString()} */}
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </div>
//   )
// }
// export const dynamic = "force-dynamic"
// export default IssuesPage
