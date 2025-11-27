import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { IconHome } from '@tabler/icons-react'

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <Container size="sm" py={50}>
            <Paper shadow="md" p="xl" radius="md" withBorder>
                <Stack align="center" gap="lg">
                    <Title order={1} size="h1" style={{ fontSize: '4rem' }}>
                        404
                    </Title>
                    <Title order={2}>
                        Short URL Not Found
                    </Title>
                    <Text size="lg" c="dimmed" ta="center">
                        The short URL you're looking for doesn't exist or has expired.
                    </Text>
                    <Button
                        size="lg"
                        leftSection={<IconHome size={20} />}
                        onClick={() => navigate({ to: '/' })}
                    >
                        Go to Home
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}