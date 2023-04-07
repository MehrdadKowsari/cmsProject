import '@testing-library/jest-dom/extend-expect'
import { loadEnvConfig } from '@next/env'

// load Next.js env environments
export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}