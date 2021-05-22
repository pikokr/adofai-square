import inquirer from "inquirer";

enum Direction {
    LEFT,
    RIGHT
}

inquirer.prompt([
    {
        message: 'adofai 파일 위치(확장자 포함)',
        type: 'input',
        name: 'filename'
    },
    {
        message: '기존 파일을 덮어씌울까요?',
        type: 'confirm',
        name: 'overwrite',
        default: false
    },
    {
        message: '사각형 시작 타일',
        type: 'number',
        name: 'startTile',
    },
    {
        message: '사각형 개수',
        type: 'number',
        name: 'count'
    },
    {
        message: '사각형을 몇 타일 전에 보여줄까요?',
        type: 'number',
        name: 'offset'
    },
    {
        message: '사각형을 보여주는 이벤트 길이',
        type: 'number',
        name: 'duration'
    },
    {
        message: '길의 진행 방향',
        type: 'list',
        name: 'direction',
        choices: [{name: '왼쪽', value: Direction.LEFT}, {name: '오른쪽', value: Direction.RIGHT}]
    }
]).then(answers => {
    console.log(answers)
}).catch((err) => {
    console.error('An error occurred.', err)
})
