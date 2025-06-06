"use client"
import { Skeleton } from "@/app/components"
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes"
import classnames from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
  return (
    <nav className="top-0 z-[5] border-b px-5 py-3 backdrop-blur-md ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap="3">
            <Link href="/" className="flex items-center gap-1  px-3">
              Issuify <AiFillBug className="inline-block"/>
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}
const NavLinks = () => {
  const currentPath = usePathname()
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ]

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === "loading") return <Skeleton width="3rem" />
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Log In
      </Link>
    )

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item onSelect={() => {}}>
            <Link href={"/api/auth/signout"}>Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
export default NavBar
