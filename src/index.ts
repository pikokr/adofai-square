import inquirer from "inquirer";
import path from "path";
import * as fs from "fs";
import {ADOFAIParser} from "./utils";

function execute({outfile, startTile, offset, duration, direction, count, overwrite, filename}: {
    filename: string,
    overwrite: boolean,
    startTile: number
    count: number
    offset: number
    duration: number
    direction: Direction
    outfile?: string
    distance: number
}) {
    const dir = path.join(filename, '..')
    const file = fs.readFileSync(filename)
    const level = ADOFAIParser(file.toString())
    if (overwrite) {
        fs.writeFileSync(path.join(), 'backup_' + file)
        outfile = filename
    }
    for (let i = 1; i < count; i++) {
        for (let j = 1; j < 5; j++) {
            if (direction === Direction.RIGHT) {
                const tile = startTile + (4 * i) + j - 1
                const v = .55 * i
                let res: any
                switch (j) {
                    case 1:
                        res = [v, v * -1]
                        break
                    case 2:
                        res = [v, v]
                        break
                    case 3:
                        res = [v * -1, v]
                        break
                    case 4:
                        res = [v * -1, v * -1]
                        break
                }
                console.log(res)
                level.actions.push(
                    {
                        "floor": startTile - offset,
                        "eventType": "MoveTrack",
                        "startTile": [tile, "ThisTile"],
                        "endTile": [tile, "ThisTile"],
                        "duration": duration,
                        "positionOffset": res,
                        "rotationOffset": 0,
                        "scale": 100,
                        "opacity": 100,
                        "angleOffset": 0,
                        "ease": "OutBack",
                        "eventTag": ""
                    }
                )
            }
        }
    }
    fs.writeFileSync(outfile!, JSON.stringify(level))
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
        startTile: 4,
        outfile: 'out.adofai',
        distance: .55
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
        {
            name: 'outfile',
            type: 'input',
            default: () => 'square.adofai',
            message: '출력 파일을 입력해주세요',
            when: answers => !answers.overwrite
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
            type: 'number',
            message: '펴놓은 타일 사이 거리',
            name: 'distance',
            default: .55
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
