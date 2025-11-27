import { Outlet } from '@tanstack/react-router'
import { AppShell, Container } from '@mantine/core'

function App() {
  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Container size="md" py="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App




