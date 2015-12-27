struct LightGrid {
    grid: [[u32;1000];1000]
}

impl LightGrid {
    fn new() -> LightGrid {
        LightGrid {
            grid: [[0; 1000] ; 1000]
        }
    }

    fn count_on(&self) -> u32 {
        self.grid.iter()
            .map(|column| column.iter().fold(0, |sum, &c| sum + c))
            .fold(0, |sum, column| sum + column)
    }
}

enum Operation {
    On,
    Off,
    Toggle
}

struct Instruction {
    operation: Operation,
    start: [usize;2],
    end: [usize;2]
}

impl Instruction {
    fn new(line: &str) -> Instruction {
        let words: Vec<&str> = line.split(" ").collect();

        let operation = match words[0] {
            "toggle" => Operation::Toggle,
            "turn"   => if words[1] == "on" { Operation::On } else { Operation::Off },
            _        => panic!("Operation not supported: {}", words[0])
        };

        let (start, end) = {
            let (start, end) = match operation {
                Operation::Toggle => (
                    words[1].split(",").collect::<Vec<&str>>(),
                    words[3].split(",").collect::<Vec<&str>>()
                ),
                _ => (
                    words[2].split(",").collect::<Vec<&str>>(),
                    words[4].split(",").collect::<Vec<&str>>()
                )
            };

            (
                [start[0].parse().unwrap(), start[1].parse().unwrap()],
                [end[0].parse().unwrap(), end[1].parse().unwrap()]
            )
        };

        Instruction { operation: operation, start: start, end: end }
    }
}

fn main() {
    let input = include_str!("data");

    let mut grid_part1 = LightGrid::new();
    let mut grid_part2 = LightGrid::new();

    let instructions = input
        .lines()
        .map(Instruction::new);

    for instruction in instructions {
        match instruction.operation {
            Operation::Toggle => {
                for x in instruction.start[0]..instruction.end[0] + 1 {
                    for y in instruction.start[1]..instruction.end[1] + 1 {
                        grid_part1.grid[x][y] = if grid_part1.grid[x][y] == 1 { 0 } else { 1 };
                        grid_part2.grid[x][y] += 2;
                    };
                };
            },
            Operation::On => {
                for x in instruction.start[0]..instruction.end[0] + 1 {
                    for y in instruction.start[1]..instruction.end[1] + 1 {
                        grid_part1.grid[x][y] = 1;
                        grid_part2.grid[x][y] += 1;
                    };
                };
            },
            Operation::Off => {
                for x in instruction.start[0]..instruction.end[0] + 1 {
                    for y in instruction.start[1]..instruction.end[1] + 1 {
                        grid_part1.grid[x][y] = 0;

                        if grid_part2.grid[x][y] > 0 {
                            grid_part2.grid[x][y] -= 1;
                        };
                    };
                };
            }
        };
    };

    println!("Part 1: {}", grid_part1.count_on());
    println!("Part 2: {}", grid_part2.count_on());
}
