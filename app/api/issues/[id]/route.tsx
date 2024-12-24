import { patchIssueSchema } from "@/app/validationSchema"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface Params {
  id: string
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const body = await request.json()
  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    })
  }

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    })
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })
  }

  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserID: body.assignedToUserId,
    },
  })

  return NextResponse.json(updateIssue)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    })

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 })
    }

    await prisma.issue.delete({ where: { id: issue.id } })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting issue" }, { status: 500 })
  }
}
