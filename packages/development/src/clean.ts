import execa from 'execa'
import path from 'path'

async function main() {
  await Promise.allSettled([
    execa.command(`rm -r packages/**/*dist`, { shell: true, stdio: 'ignore', cwd: path.join(__dirname, '../../..') }),
  ])
}

if (require.main === module) {
  main()
}
