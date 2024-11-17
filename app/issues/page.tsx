import React from "react"
import { Button, Link } from "@radix-ui/themes"

const IssuePage = () => {
  return (
    <div>
      <Button>
        <Link
          href="/issues/new"
          underline="none"
          style={{ color: "white"}}>
          New Issue
        </Link>
      </Button>
    </div>
  )
}

export default IssuePage
