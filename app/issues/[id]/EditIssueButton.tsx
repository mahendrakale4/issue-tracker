import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({issueId}:{issueId: number}) => {
  return (
    <div>
      <Button style={{ width: "100%" }}>
        <Pencil2Icon />
        <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
      </Button>
    </div>
  )
}

export default EditIssueButton
