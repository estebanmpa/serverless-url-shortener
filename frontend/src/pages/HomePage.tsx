import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Container,
    Title,
    Text,
    TextInput,
    Button,
    Paper,
    Stack,
    Group,
    CopyButton,
    ActionIcon,
    Tooltip,
    Alert,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconLink, IconCopy, IconCheck } from '@tabler/icons-react'
import { useCreateShortUrl } from '@/hooks/useCreateShortUrl'

// Zod validation schema
const urlSchema = z.object({
    url: z.url({ protocol: /^https?$/ }),
})

// Infer TypeScript type from Zod schema
type UrlFormData = z.infer<typeof urlSchema>

export default function HomePage() {
    const [shortUrl, setShortUrl] = useState<string>('')

    // React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UrlFormData>({
        resolver: zodResolver(urlSchema),
        mode: 'onChange',
        defaultValues: { url: '' }
    })

    // Use the custom hook from hooks folder
    const { mutate: createShortUrl, isPending } = useCreateShortUrl()

    const onSubmit = (data: UrlFormData): void => {
        setShortUrl('')
        createShortUrl(data, {
            onSuccess: (responseData) => {
                setShortUrl(responseData.shortUrl)
                notifications.show({
                    title: 'Success!',
                    message: 'Your short URL has been created',
                    color: 'green',
                })
            },
            onError: (error) => {
                notifications.show({
                    title: 'Error',
                    message: error.message || 'Failed to create short URL',
                    color: 'red',
                })
            },
        }
        )
    }

    return (
        <Container size="sm" py={50}>
            <Stack gap="lg">
                <div style={{ textAlign: 'center' }}>
                    <Title order={1} mb="sm">
                        🔗 URL Shortener
                    </Title>
                    <Text c="dimmed" size="lg">
                        Shorten your long URLs into easy-to-share links
                    </Text>
                </div>

                <Paper shadow="md" p="xl" radius="md" withBorder>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                placeholder="https://example.com/very/long/url"
                                label="Enter your URL"
                                size="lg"
                                leftSection={<IconLink size={20} />}
                                error={errors.url?.message}
                                {...register('url')}
                            />

                            <Button
                                fullWidth
                                size="lg"
                                type="submit"
                                loading={isPending}
                            >
                                Shorten URL
                            </Button>

                            {shortUrl && (
                                <Alert
                                    variant="light"
                                    color="green"
                                    title="Your shortened URL"
                                    icon={<IconCheck size={20} />}
                                >
                                    <Group gap="xs" mt="xs">
                                        <TextInput
                                            readOnly
                                            value={shortUrl}
                                            style={{ flex: 1 }}
                                            styles={{
                                                input: {
                                                    fontFamily: 'monospace',
                                                    backgroundColor: '#f8f9fa',
                                                },
                                            }}
                                        />
                                        <CopyButton value={shortUrl} timeout={2000}>
                                            {({ copied, copy }) => (
                                                <Tooltip label={copied ? 'Copied!' : 'Copy'} withArrow>
                                                    <ActionIcon
                                                        color={copied ? 'teal' : 'blue'}
                                                        variant="filled"
                                                        onClick={copy}
                                                        size="lg"
                                                    >
                                                        {copied ? (
                                                            <IconCheck size={18} />
                                                        ) : (
                                                            <IconCopy size={18} />
                                                        )}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                    </Group>
                                </Alert>
                            )}
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </Container>
    )
}
