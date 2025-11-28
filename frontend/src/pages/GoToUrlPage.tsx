import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { Container, Loader, Text, Stack } from '@mantine/core'
import NotFoundPage from './NotFoundPage'
import { useGetUrl } from '@/hooks/useGetUrl'

export default function GoToUrlPage() {
    const location = useLocation()
    // Extract the short code from the pathname (remove leading slash)
    const shortCode = location.pathname.slice(1)
    
    const { data, isLoading, isError } = useGetUrl(shortCode)

    useEffect(() => {
        if (data?.url) {
            // Redirect to the original URL
            window.location.href = data.url
        }
    }, [data?.url])

    // Show loading state while fetching
    if (isLoading) {
        return (
            <Container size="sm" py={50}>
                <Stack align="center" gap="md">
                    <Loader size="lg" />
                    <Text size="lg" c="dimmed">
                        Redirecting...
                    </Text>
                </Stack>
            </Container>
        )
    }

    // Show NotFoundPage on error
    if (isError) {
        return <NotFoundPage />
    }

    // Show redirecting message (brief moment before redirect happens)
    return (
        <Container size="sm" py={50}>
            <Stack align="center" gap="md">
                <Loader size="lg" />
                <Text size="lg" c="dimmed">
                    Redirecting to {data?.shortUrl}...
                </Text>
            </Stack>
        </Container>
    )
}