import { execa, ExecaReturnValue } from 'execa'
import { detect } from './detect'

export type InstallOptions = {
    cwd?: string
    dev?: boolean
}

export const install = async (
    names: string | string[],
    options: InstallOptions = { cwd: process.cwd() }
): Promise<ExecaReturnValue<string>> => {
    const agent = await detect(options.cwd)

    if (!Array.isArray(names)) names = [names]

    return execa(
        agent,
        [
            agent !== 'yarn' ? 'i' : 'add',
            options.dev ? '-D' : '-P',
            ...names,
        ].filter(Boolean)
    )
}
