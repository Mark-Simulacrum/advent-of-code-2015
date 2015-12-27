use std::io::prelude::*;
use std::fs::File;
use std::collections::HashSet;

#[derive(Hash, Eq, PartialEq, Debug)]
struct Point {
    x: i32,
    y: i32
}

fn main() {
    let mut f = File::open("data").ok().unwrap();
    let mut input = String::new();

    f.read_to_string(&mut input).ok();

    {
        let mut santa = Point { x: 0, y: 0 };
        let mut visited = HashSet::new();

        visited.insert(Point { x: 0, y: 0 });

        for step in input.chars() {
            match step {
                '>' => santa.x += 1,
                '<' => santa.x -= 1,
                '^' => santa.y += 1,
                'v' => santa.y -= 1,
                _   => {}
            };

            visited.insert(Point { .. santa });
        }

        println!("Part 1: {}", visited.len());
    }

    {

        let mut santa = Point { x: 0, y: 0 };
        let mut robo_santa = Point { x: 0, y: 0 };

        let mut visited = HashSet::new();

        visited.insert(Point { x: 0, y: 0 });

        for (i, step) in input.chars().enumerate() {
            let is_santa_turn = i % 2 == 0;

            if is_santa_turn {
                match step {
                    '>' => santa.x += 1,
                    '<' => santa.x -= 1,
                    '^' => santa.y += 1,
                    'v' => santa.y -= 1,
                    _   => {}
                };

                visited.insert(Point { .. santa });
            } else {
                match step {
                    '>' => robo_santa.x += 1,
                    '<' => robo_santa.x -= 1,
                    '^' => robo_santa.y += 1,
                    'v' => robo_santa.y -= 1,
                    _   => {}
                };

                visited.insert(Point { .. robo_santa });
            }
        }

        println!("Part 2: {}", visited.len());
    }
}
