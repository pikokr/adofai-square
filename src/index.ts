import inquirer from "inquirer";
import path from "path";

function execute(answers: {
    filename: string,
    overwrite: boolean,
    startTile: number
    count: number
    offset: number
    duration: number
    direction: Direction
    outfile?: string
}) {
    const dir = path.join(answers.filename, '..')
    console.log(dir)
}

enum Direction {
    LEFT,
    RIGHT
}

if (process.env.DEV === 'true') {
    execute({
        filename: path.join(process.cwd(), 'test.adofai'),
        overwrite: false,
        count: 4,
        direction: Direction.RIGHT,
        duration: 2,
        offset: 4,
        startTile: 4
    })
} else
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
        {name: 'outfile', type: 'input', default: () => 'square.adofai', message: '출력 파일을 입력해주세요', when: answers => answers.overwrite},
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
        execute(answers)
    }).catch((err) => {
        console.error('An error occurred.', err)
    })
