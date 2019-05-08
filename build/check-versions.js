/**
 * 检查node，npm版本是否符合要求
 */

'use strict'
const chalk = require('chalk') //修改控制台中字符串的样式，包括：1.字体样式(加粗、隐藏等)；2.字体颜色；3.背景颜色
const semver = require('semver') //Semver是一个专门分析Semantic Version（语义化版本）的工具，“semver”其实就是这两个单词的缩写。Npm使用了该工具来处理版本相关的工作。
const packageConfig = require('../package.json')
const shell = require('shelljs') // 通过该模块可以方便地调用系统命令，shelljs 模块重新包装了 child_process

function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function () {
    const warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]

        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    if (warnings.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }

        console.log()
        process.exit(1)
    }
}
