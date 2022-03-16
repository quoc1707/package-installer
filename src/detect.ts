import { findUp } from 'find-up'
import { basename } from 'path'

const lockFiles: Record<string, string> = {
    'package-lock.json': 'npm',
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
}

export const detect = async (cwd = process.cwd()): Promise<string> => {
    const lockFilePath = await findUp(Object.keys(lockFiles), { cwd })
    return lockFilePath ? lockFiles[basename(lockFilePath)] : 'npm'
}
