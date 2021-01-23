let N = 2;
let M = 8;

let layerInput = '1 1 2 2 6 5 5 8 3 3 4 4 6 7 7 8'

const buildAWall = (N, M, layerInput) => {
    /**
     * rows is the container for all the first layer rows;
     * rowContainer is needed as a temporary container as i map the input
     * firstLayer is the input splitted by space
     */
    let rows = []
    let rowContainer = []
    let firstLayer = layerInput.split(' ')

    /**
     * This loop fills the rows array where each row is an array with
     * length of M and the rows array has length of N. If a brick is too long
     * it returns -1 and logs a message
     */
    for (let i = 0; i <= firstLayer.length; i++) {
        if (rows.length === N) {
            console.log('No solution exists')
            return -1;
        }

        if (rowContainer.length === M) {
            rows.push(rowContainer);
            rowContainer = []
            rowContainer.push(firstLayer[i])
        } else {
            rowContainer.push(firstLayer[i])
        }

    }

    /**
     * secondLayer is a container for the second layer and I initiate it by filling it
     * with "*" 
     * bricks is the brick counter
     */
    let secondLayer = rows.map(el => el.slice(0).fill('*', 0))
    let bricks = 1;

    /**
     * this loop maps the secondLayer
     */
    for (let i = 0; i < rows.length; i = i + 2) {
        
        for (let y = 0; y < rows[i].length; y++) {


            /**
             * Check if the current element equals the next one. This means the brick is
             * horizontal. If it is, check if the current element is different than "*".
             * If it is "*" this means that its empty and i can place a "|" at that element
             * and the next one which will indicate to me later where the vertical bricks will be.
             * If it is everything other than a "*" there is a brick already positioned there so i place 
             * "|" starting from the next one
             */
            if (rows[i][y] === rows[i][y + 1]) {
                if (secondLayer[i][y] !== '*') {
                    secondLayer[i][y + 1] = '|'
                    secondLayer[i][y + 2] = '|'
                    y++
                } else {
                    secondLayer[i][y] = '|'
                    secondLayer[i][y + 1] = '|'
                    y++
                }
            /**
             * check if the current element equals the one directly below it which will mean that
             * it is a vertical brick.
             * If it does, check if its in a even or odd position. If its on an odd position place
             * a brick starting from the previous index and if it's even, start from the current one.
             * Places bricks on the second row too.
             */
            } else if (rows[i][y] === rows[i + 1][y]) {
                if (y % 2 !== 0) {
                    secondLayer[i][y - 1] = bricks
                    secondLayer[i][y] = bricks
                    secondLayer[i + 1][y - 1] = bricks + 1
                    secondLayer[i + 1][y] = bricks + 1
                    bricks = bricks + 2;
                } else if (y % 2 === 0) {
                    secondLayer[i][y] = bricks
                    secondLayer[i][y + 1] = bricks
                    secondLayer[i + 1][y] = bricks + 1
                    secondLayer[i + 1][y + 1] = bricks + 1
                    bricks = bricks + 2;
                }
                /**
                 * Check if the current element equals the previous one which would mean that
                 * the brick is horizontal. If it does place "|" on the current and previous index.
                 */
            } else if (rows[i][y] === rows[i][y - 1]) {
                secondLayer[i][y] = '|'
                secondLayer[i][y - 1] = '|'
            }
        }
    }

    /**
     * look for the '|' and place a brick in its place
     */
    for (let i = 0; i < secondLayer.length; i = i + 2) {
        for (let y = 0; y < secondLayer[i].length; y++) {
            if (secondLayer[i][y] === '|') {
                secondLayer[i][y] = bricks;
                secondLayer[i + 1][y] = bricks;
                bricks = bricks + 1;
            }
        }
    }

    /**
     * Map the result and return it 
     */
    return secondLayer.map(row => row.join(' ')).join('\n')
}

console.log(buildAWall(N, M, layerInput))
