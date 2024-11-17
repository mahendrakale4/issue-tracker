import { NextRequest, NextResponse } from "next/server"
import { title } from "process"
import prisma from "@/prisma/client"
import { z } from "zod"

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is Required ").max(255),
  description: z.string().min(1, "description is Required "),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validation.error.format() },
      { status: 400 }
    )
  }

  // When using Client in Js/Ts, you always use the model name in lowercase in the Client queries, even if the model is defined with a capital letter in the schema.
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(newIssue, { status: 201 })
}
