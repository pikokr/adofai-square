declare global {
    interface String {
        replaceAll: (org: string, dest: string) => string
    }
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

export const ADOFAIParser = (level: string) => {
    return JSON.parse(String(level).trim()
        .replaceAll(', ,', ',')
        .replaceAll('}\n', '},\n')
        .replaceAll('},\n\t]', '}\n\t]')
        .replaceAll(', },', ' },')
        .replaceAll(', }', ' }')
        .replaceAll('\n', '')
        .replaceAll('}\n', '},\n'));
}