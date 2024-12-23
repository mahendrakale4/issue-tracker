"use client"

import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2"

type Props = {
  itemCount: number
  pageSize: number
  currentPage: number
}

export const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Calculate page count and ensure currentPage is valid
  const pageCount = Math.ceil(itemCount / pageSize)
  const current = Math.max(1, Math.min(currentPage, pageCount)) // Prevent invalid page numbers

  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString()) // Ensure we get the correct search params
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Flex align="center" gap="3" as="span">
      {/* First page button */}
      <Button
        color="gray"
        variant="ghost"
        disabled={current === 1}
        onClick={() => changePage(1)}
        className="cursor-pointer rounded-full p-2">
        <HiMiniChevronDoubleLeft className="size-5" />
      </Button>

      {/* Previous page button */}
      <Button
        color="gray"
        variant="ghost"
        disabled={current === 1}
        onClick={() => changePage(current - 1)}
        className="cursor-pointer rounded-full p-2">
        <HiMiniChevronLeft className="size-5" />
      </Button>

      {/* Next page button */}
      <Button
        color="gray"
        variant="ghost"
        disabled={current === pageCount}
        onClick={() => changePage(current + 1)}
        className="cursor-pointer rounded-full p-2">
        <HiMiniChevronRight className="size-5" />
      </Button>

      {/* Last page button */}
      <Button
        color="gray"
        variant="ghost"
        disabled={current === pageCount}
        onClick={() => changePage(pageCount)}
        className="cursor-pointer rounded-full p-2">
        <HiMiniChevronDoubleRight className="size-5" />
      </Button>

      <Text size="2" weight="medium" ml="2">
        Page {current} of {pageCount}
      </Text>
    </Flex>
  )
}
