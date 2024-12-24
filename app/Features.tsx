import { Box, Card, Grid, Heading, Section, Text } from "@radix-ui/themes"
import { AiFillThunderbolt } from "react-icons/ai"
import { FiCheckCircle } from "react-icons/fi"
import { HiUsers } from "react-icons/hi2"
import { IoLockOpen } from "react-icons/io5"

const features = [
  {
    icon: <FiCheckCircle className="size-6 text-blue-500" />,
    title: "Intuitive Issue Tracking",
    description:
      "Easily create, assign, and manage issues with our user-friendly UI.",
  },
  {
    icon: <AiFillThunderbolt className="size-6 text-yellow-500" />,
    title: "Lightning Fast",
    description:
      "Optimized performance for quick access to your issues and data.",
  },
  {
    icon: <HiUsers className="size-6 text-green-500" />,
    title: "Team Management",
    description:
      "Organize your team, assign issues, and track progress effortlessly.",
  },
  {
    icon: <IoLockOpen className="size-6 text-red-500" />,
    title: "Secure and Reliable",
    description:
      "Your data is protected with enterprise-grade security measures.",
  },
]

export const Features = () => {
  return (
    <Section id="features" className="py-20">
      <Heading
        align="center"
        weight="bold"
        className="mb-12 text-2xl md:text-3xl text-gray-800">
        Powerful Features to Boost Your Productivity
      </Heading>

      <Box>
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex items-center gap-4">
                <div className="text-xl">{feature.icon}</div>

                <div className="mt-4 mb-4 pt-2 pb-2">
                  <Heading
                    as="h3"
                    size="4"
                    weight="medium"
                    className="text-gray-700">
                    {feature.title}
                  </Heading>
                  <Text as="p" size="3" className="text-gray-600">
                    {feature.description}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Box>
    </Section>
  )
}
