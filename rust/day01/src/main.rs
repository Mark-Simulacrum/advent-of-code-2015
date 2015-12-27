use std::io::prelude::*;
use std::fs::File;

fn main() {
    let mut f = File::open("data").ok().unwrap();
    let mut s = String::new();

    f.read_to_string(&mut s).ok();

    {
        let mut floor = 0;
        for c in s.chars() {
            floor += match c {
                '(' => 1,
                ')' => -1,
                _   => 0
            }
        }

        println!("Part 1: {}", floor);
    }

    {
        let mut floor = 0;
        let mut counter = 0;
        for c in s.chars() {
            counter += 1;
            floor += match c {
                '(' => 1,
                ')' => -1,
                _   => 0
            };

            if floor < 0 {
                break;
            }
        }

        println!("Part 2: {}", counter);
    }
}
